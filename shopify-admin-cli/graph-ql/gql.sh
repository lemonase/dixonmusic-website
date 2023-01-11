source .env
curl -sSL -X POST https://dixon-music.myshopify.com/admin/api/2023-01/graphql.json \
    -H 'Content-Type: application/graphql' \
    -H "X-Shopify-Access-Token: ${SHOPIFY_ADMIN_ACCESS_TOKEN}" \
    --data "@$1" | jq
