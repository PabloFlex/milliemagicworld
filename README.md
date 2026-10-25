# Millie's Magic World

Site Next.js de la boutique, branché sur **Shopify** (mode « headless ») :
le design reste celui du site, et tout le reste se gère depuis l'admin Shopify —
articles, prix, tailles, stock, photos, commandes, paiements, livraisons, codes promo.

```bash
npm install
npm run dev        # http://localhost:3000
```

Sans configuration Shopify, le site affiche les produits de démo de
`content/mockProducts.ts` et le bouton d'achat indique « La boutique ouvre bientôt ».

---

## Mise en place de Shopify (une seule fois)

### 1. Créer la boutique
1. Créer un compte sur [shopify.com](https://www.shopify.com/fr) (plan **Basic** suffit).
2. **Paramètres → Général** : devise **EUR**, fuseau horaire Paris.
3. **Paramètres → Paiements** : activer Shopify Payments (CB, Apple Pay, Google Pay) et PayPal si besoin.
4. **Paramètres → Expédition et livraison** : zones et tarifs.
5. **Paramètres → Politiques** : CGV, remboursement, confidentialité, mentions légales (obligatoires en France).

### 2. Jeton pour le site (Storefront API)
1. Dans l'App Store Shopify, installer le canal de vente **Headless** (gratuit, édité par Shopify).
2. Créer un storefront, puis copier le **jeton d'accès public** (Storefront API).

### 3. Accès pour le script d'installation (Admin API)
Créer une app sur le [Dev Dashboard Shopify](https://dev.shopify.com) avec les droits
`write_products`, `read_publications` et `write_publications`, l'installer sur la boutique,
puis copier son **Client ID** et son **Client secret**.
(Si la boutique propose encore *Paramètres → Applications → Développer des applications*,
un jeton admin `shpat_…` fonctionne aussi.)

### 4. Configurer et remplir la boutique
```bash
cp .env.example .env.local   # puis remplir les valeurs
npm run shopify:setup
```
Le script crée automatiquement :
- les **champs personnalisés** des fiches (catégorie, badge, délai de livraison, points forts, histoire, couleurs d'aura) ;
- les **4 pièces actuelles** (Halo Coat ∞, Prism Set, Astral Bag, Nebula Boots) avec leurs tailles et prix ;
- la collection **Sélection atelier**, qui décide quelles pièces apparaissent sur l'accueil, et dans quel ordre ;
- la publication sur tous les canaux de vente.

Il peut être relancé sans risque : il ne touche jamais un produit qui existe déjà.

Ensuite, dans l'admin : **ajouter les photos** de chaque pièce et, si besoin, activer
le **suivi du stock** par taille (désactivé au départ, sinon tout serait « épuisé »).

### 5. Mettre en ligne (Vercel)
Dans le projet Vercel → *Settings → Environment Variables*, ajouter :

| Variable | Valeur |
| --- | --- |
| `SHOPIFY_STORE_DOMAIN` | `ta-boutique.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | jeton public de l'étape 2 |
| `SHOPIFY_FEATURED_COLLECTION` | `selection-atelier` |

(Les variables `SHOPIFY_ADMIN_*` / `SHOPIFY_CLIENT_*` ne servent qu'au script : ne pas les mettre sur Vercel.)

Enfin, dans **Boutique en ligne → Préférences**, retirer le mot de passe de la boutique
quand tout est prêt, sinon le paiement reste bloqué.

---

## Au quotidien : où changer quoi

| Je veux… | Dans l'admin Shopify |
| --- | --- |
| Ajouter / modifier une pièce | **Produits** → titre, description, prix, photos |
| Gérer les tailles | **Produits** → option **Taille** (le site affiche ces valeurs) |
| Badge, délai, points forts, histoire, couleurs | **Produits** → bas de la fiche, *Champs méta* |
| Choisir les pièces de l'accueil et leur ordre | **Produits → Collections → Sélection atelier** |
| Gérer le stock | **Produits** → variantes → *Suivre la quantité* (une taille à 0 s'affiche barrée) |
| Traiter les commandes | **Commandes** (ou l'appli mobile Shopify) |
| Codes promo | **Réductions** |

Les changements apparaissent sur le site en **moins d'une minute**, sans redéploiement.

Dans le champ **Histoire de la pièce**, une ligne vide sépare deux paragraphes.

---

## Technique

- `lib/shopify/` : client Storefront API, lecture des produits, panier.
- `app/actions/cart.ts` : server actions du panier (identifiant du panier en cookie `mmw_cart`).
- `components/cart/` : panier latéral, bouton panier, choix de taille + ajout au panier.
- Le paiement se fait sur le checkout Shopify (`checkoutUrl` du panier).
- Pour tester sans boutique : `SHOPIFY_STORE_DOMAIN=mock.shop` et
  `SHOPIFY_FEATURED_COLLECTION=featured` (boutique de démo publique de Shopify).
