# Shopify Admin Cli

The plan:

use <https://github.com/Shopify/shopify_python_api> to add inventory to shopify
store

## Bulk Import Products into Shopify with GraphQL Admin API

Docs: <https://shopify.dev/api/usage/bulk-operations/imports>

### Steps

1. Get JSONL file with all products
2. Stage The Upload (Get URL to upload bespoke JSONL file to)
3. Upload (POST) JSONL to storage endpoint
4. Monitor and query for successful upload

### What it looks like in practice

0. Ensure `.env` file has API credentials for both Discogs and Shopify Admin API (see code for details)

1. Run python script `/discogs-api/main.py` that will output a jsonl file with all Discogs listings.

2. Run the shell script that prepares storage for variables. We will need to save the response headers for the next request.
`./graph-ql/gql.sh ./graph-ql/mutations/bulk_create/gql/stage_uploads_create.gql > ./graph-ql/mutations/bulk_create/data/stageUploadsRes.json`

3. Create a script called `./graph-ql/upload_jsonl.sh` to invoke curl according to [this POST request](https://shopify.dev/api/usage/bulk-operations/imports#upload-the-jsonl-file)
using the reponse data in `./graph-ql/mutations/bulk_create/data/stageUploadsRes.json`

4. Check that the bulk upload job has been created using
`./graph-ql/gql.sh ./graph-ql/queries/check_bulk_op_status.gql`
and `./graph-ql/gql.sh ./graph-ql/queries/check_bulk_op_count.gql`
