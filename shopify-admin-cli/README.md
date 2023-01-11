# Shopify Admin Cli

The plan:

use <https://github.com/Shopify/shopify_python_api> to add inventory to shopify
store

## Bulk Import Products into Shopify with GraphQL Admin API

Docs: <https://shopify.dev/api/usage/bulk-operations/imports>

### Steps

1. Create a JSONL file with all our products
1. Stage The Upload with Shopify (Get a special URL to upload bespoke JSONL file to)
1. Upload (POST) JSONL to storage endpoint
1. Monitor and query for successful upload

### What it looks like in practice

1. Ensure `.env` file has API credentials for both Discogs and Shopify Admin API (see code for details)
1. Run python script `./discogs-api/output_listings.py ./graph-ql/mutations/bulk_create/data/gql_product_input.jsonl` that will output a jsonl file with all Discogs listings.
1. Run the shell script that prepares storage for variables. We will need to save the response headers for the next request.
`./graph-ql/gql.sh ./graph-ql/mutations/bulk_create/gql/stage_uploads_create.gql > ./graph-ql/mutations/bulk_create/data/stageUploadsRes.json`
1. Create a script called `./graph-ql/upload_jsonl.sh` to invoke curl according to [this POST request](https://shopify.dev/api/usage/bulk-operations/imports#upload-the-jsonl-file)
using the reponse data in `./graph-ql/mutations/bulk_create/data/stageUploadsRes.json`
1. Check that the bulk upload job has been created using
`./graph-ql/gql.sh ./graph-ql/queries/check_bulk_op_status.gql` and `./graph-ql/gql.sh ./graph-ql/queries/check_bulk_op_count.gql`
