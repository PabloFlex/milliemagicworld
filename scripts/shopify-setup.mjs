// Prépare la boutique Shopify pour le site Millie's Magic World :
//   1. crée les champs personnalisés produit (namespace "millie") lisibles par le site
//   2. crée les produits de content/mockProducts.ts qui n'existent pas encore
//   3. crée la collection "selection-atelier" (pièces affichées sur l'accueil)
//   4. publie le tout sur tous les canaux de vente (Boutique en ligne + Headless)
//
// Usage : npm run shopify:setup   (lit .env.local)
// Le script peut être relancé sans risque : il ne modifie jamais un produit existant.

import { mockFeaturedProducts } from "../content/mockProducts.ts";

const domain = process.env.SHOPIFY_ADMIN_DOMAIN ?? process.env.SHOPIFY_STORE_DOMAIN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2026-04";
const collectionHandle = process.env.SHOPIFY_FEATURED_COLLECTION ?? "selection-atelier";

if (!domain || domain === "mock.shop") {
  console.error("❌ Renseigne SHOPIFY_STORE_DOMAIN (ex. millie-magic-world.myshopify.com) dans .env.local");
  process.exit(1);
}

async function getAdminToken() {
  if (process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
    return process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  }
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.error(
      "❌ Renseigne SHOPIFY_ADMIN_ACCESS_TOKEN, ou SHOPIFY_CLIENT_ID + SHOPIFY_CLIENT_SECRET, dans .env.local",
    );
    process.exit(1);
  }
  // Apps du Dev Dashboard installées sur sa propre boutique : jeton via client credentials
  const response = await fetch(`https://${domain}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  if (!response.ok) {
    console.error(`❌ Impossible d'obtenir le jeton admin (${response.status}) : ${await response.text()}`);
    process.exit(1);
  }
  return (await response.json()).access_token;
}

const token = await getAdminToken();

async function admin(query, variables = {}) {
  const response = await fetch(`https://${domain}/admin/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await response.json();
  if (!response.ok || json.errors) {
    throw new Error(JSON.stringify(json.errors ?? json, null, 2));
  }
  return json.data;
}

// ── 1. Champs personnalisés ────────────────────────────────────────────────
const definitions = [
  { key: "category", name: "Catégorie (drop / capsule)", type: "single_line_text_field" },
  { key: "badge", name: "Badge (ex. Edition limitée)", type: "single_line_text_field" },
  { key: "shipping", name: "Délai de livraison affiché", type: "single_line_text_field" },
  { key: "highlights", name: "Points forts", type: "list.single_line_text_field" },
  { key: "story", name: "Histoire de la pièce", type: "multi_line_text_field" },
  { key: "aura_from", name: "Aura – couleur 1", type: "color" },
  { key: "aura_via", name: "Aura – couleur 2", type: "color" },
  { key: "aura_to", name: "Aura – couleur 3", type: "color" },
];

console.log("✦ Champs personnalisés");
for (const definition of definitions) {
  const { metafieldDefinitionCreate } = await admin(
    `mutation ($definition: MetafieldDefinitionInput!) {
      metafieldDefinitionCreate(definition: $definition) {
        createdDefinition { id }
        userErrors { code message }
      }
    }`,
    {
      definition: {
        ...definition,
        namespace: "millie",
        ownerType: "PRODUCT",
        access: { storefront: "PUBLIC_READ" },
        pin: true,
      },
    },
  );
  const errors = metafieldDefinitionCreate.userErrors.filter((error) => error.code !== "TAKEN");
  if (errors.length) throw new Error(`${definition.key}: ${JSON.stringify(errors)}`);
  console.log(`  ${metafieldDefinitionCreate.createdDefinition ? "+ créé" : "= existe"}  ${definition.name}`);
}

// ── 2. Produits ────────────────────────────────────────────────────────────
function toPrice(label) {
  const amount = Number(label.replace(/[^\d,.]/g, "").replace(",", "."));
  return amount.toFixed(2);
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function findProductId(handle) {
  const { products } = await admin(
    `query ($query: String!) { products(first: 1, query: $query) { nodes { id handle } } }`,
    { query: `handle:${handle}` },
  );
  return products.nodes.find((node) => node.handle === handle)?.id;
}

console.log("✦ Produits");
const productIds = [];
for (const product of mockFeaturedProducts) {
  const existingId = await findProductId(product.id);
  if (existingId) {
    console.log(`  = existe   ${product.title}`);
    productIds.push(existingId);
    continue;
  }

  const metafields = [
    ["category", "single_line_text_field", product.category],
    ["badge", "single_line_text_field", product.badge],
    ["shipping", "single_line_text_field", product.shipping],
    ["highlights", "list.single_line_text_field", JSON.stringify(product.highlights)],
    ["story", "multi_line_text_field", product.story.join("\n\n")],
    ["aura_from", "color", product.aura.from],
    ["aura_via", "color", product.aura.via],
    ["aura_to", "color", product.aura.to],
  ]
    .filter(([, , value]) => value)
    .map(([key, type, value]) => ({ namespace: "millie", key, type, value }));

  const { productSet } = await admin(
    `mutation ($input: ProductSetInput!) {
      productSet(synchronous: true, input: $input) {
        product { id }
        userErrors { field message }
      }
    }`,
    {
      input: {
        title: product.title,
        handle: product.id,
        descriptionHtml: `<p>${escapeHtml(product.description)}</p>`,
        productType: product.category,
        vendor: "Millie's Magic World",
        status: "ACTIVE",
        productOptions: [
          { name: "Taille", position: 1, values: product.sizes.map((name) => ({ name })) },
        ],
        // Stock non suivi au départ : à activer par taille dans l'admin
        variants: product.sizes.map((size) => ({
          optionValues: [{ optionName: "Taille", name: size }],
          price: toPrice(product.price),
          inventoryItem: { tracked: false },
        })),
        metafields,
      },
    },
  );
  if (productSet.userErrors.length) {
    throw new Error(`${product.title}: ${JSON.stringify(productSet.userErrors)}`);
  }
  console.log(`  + créé     ${product.title}`);
  productIds.push(productSet.product.id);
}

// ── 3. Collection de l'accueil ─────────────────────────────────────────────
console.log("✦ Collection");
const { collections } = await admin(
  `query ($query: String!) { collections(first: 1, query: $query) { nodes { id handle } } }`,
  { query: `handle:${collectionHandle}` },
);
let collectionId = collections.nodes.find((node) => node.handle === collectionHandle)?.id;

if (collectionId) {
  // Ajoute seulement les pièces absentes (les autres gardent leur ordre)
  await admin(
    `mutation ($id: ID!, $productIds: [ID!]!) {
      collectionAddProducts(id: $id, productIds: $productIds) { userErrors { message } }
    }`,
    { id: collectionId, productIds },
  );
  console.log(`  = existe   Sélection atelier (${collectionHandle})`);
} else {
  const { collectionCreate } = await admin(
    `mutation ($input: CollectionInput!) {
      collectionCreate(input: $input) { collection { id } userErrors { message } }
    }`,
    {
      input: {
        title: "Sélection atelier",
        handle: collectionHandle,
        sortOrder: "MANUAL",
        descriptionHtml: "<p>Pièces affichées sur la page d'accueil du site, dans cet ordre.</p>",
        products: productIds,
      },
    },
  );
  if (collectionCreate.userErrors.length) {
    throw new Error(JSON.stringify(collectionCreate.userErrors));
  }
  collectionId = collectionCreate.collection.id;
  console.log(`  + créé     Sélection atelier (${collectionHandle})`);
}

// ── 4. Publication sur les canaux de vente ─────────────────────────────────
console.log("✦ Publication");
const { publications } = await admin(`{ publications(first: 20) { nodes { id name } } }`);
for (const id of [...productIds, collectionId]) {
  const { publishablePublish } = await admin(
    `mutation ($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) { userErrors { message } }
    }`,
    { id, input: publications.nodes.map((publication) => ({ publicationId: publication.id })) },
  );
  if (publishablePublish.userErrors.length) {
    console.warn(`  ! ${id}: ${JSON.stringify(publishablePublish.userErrors)}`);
  }
}
console.log(`  publié sur : ${publications.nodes.map((publication) => publication.name).join(", ")}`);

console.log("\n✅ Boutique prête. Ajoute maintenant les photos de chaque pièce dans l'admin Shopify.");
