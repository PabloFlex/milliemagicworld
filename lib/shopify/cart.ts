import { formatMoney, storefrontFetch } from "./client";

export type CartLine = {
  id: string;
  quantity: number;
  title: string;
  size: string;
  handle: string;
  image?: string;
  price: string;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: string;
  lines: CartLine[];
};

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  lines(first: 100) {
    nodes {
      id
      quantity
      cost { totalAmount { amount currencyCode } }
      merchandise {
        ... on ProductVariant {
          title
          image { url }
          product { title handle featuredImage { url } }
        }
      }
    }
  }
`;

type Money = { amount: string; currencyCode: string };

type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: Money };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      cost: { totalAmount: Money };
      merchandise: {
        title: string;
        image: { url: string } | null;
        product: {
          title: string;
          handle: string;
          featuredImage: { url: string } | null;
        };
      };
    }[];
  };
};

type CartPayload = {
  cart: ShopifyCart | null;
  userErrors: { message: string }[];
};

function mapCart(cart: ShopifyCart): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: formatMoney(cart.cost.subtotalAmount),
    lines: cart.lines.nodes.map((line) => ({
      id: line.id,
      quantity: line.quantity,
      title: line.merchandise.product.title,
      size:
        line.merchandise.title === "Default Title" ? "TU" : line.merchandise.title,
      handle: line.merchandise.product.handle,
      image:
        line.merchandise.image?.url ??
        line.merchandise.product.featuredImage?.url,
      price: formatMoney(line.cost.totalAmount),
    })),
  };
}

function unwrap(payload: CartPayload): Cart {
  if (payload.userErrors.length || !payload.cart) {
    throw new Error(
      payload.userErrors.map((error) => error.message).join(" / ") ||
        "Panier introuvable",
    );
  }
  return mapCart(payload.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const { cart } = await storefrontFetch<{ cart: ShopifyCart | null }>(
    `query Cart($cartId: ID!) { cart(id: $cartId) { ${CART_FIELDS} } }`,
    { variables: { cartId }, cache: false },
  );
  return cart ? mapCart(cart) : null;
}

export async function createCart(variantId: string, quantity: number) {
  const { cartCreate } = await storefrontFetch<{ cartCreate: CartPayload }>(
    `mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) { cart { ${CART_FIELDS} } userErrors { message } }
    }`,
    { variables: { lines: [{ merchandiseId: variantId, quantity }] }, cache: false },
  );
  return unwrap(cartCreate);
}

export async function addCartLine(
  cartId: string,
  variantId: string,
  quantity: number,
) {
  const { cartLinesAdd } = await storefrontFetch<{ cartLinesAdd: CartPayload }>(
    `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } }
    }`,
    {
      variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
      cache: false,
    },
  );
  return unwrap(cartLinesAdd);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
) {
  const { cartLinesUpdate } = await storefrontFetch<{
    cartLinesUpdate: CartPayload;
  }>(
    `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } }
    }`,
    { variables: { cartId, lines: [{ id: lineId, quantity }] }, cache: false },
  );
  return unwrap(cartLinesUpdate);
}

export async function removeCartLine(cartId: string, lineId: string) {
  const { cartLinesRemove } = await storefrontFetch<{
    cartLinesRemove: CartPayload;
  }>(
    `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } userErrors { message } }
    }`,
    { variables: { cartId, lineIds: [lineId] }, cache: false },
  );
  return unwrap(cartLinesRemove);
}
