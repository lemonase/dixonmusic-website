import shopify
from dotenv import load_dotenv
import binascii
import os

load_dotenv()

shopify.Session.setup(
    api_key=os.environ.get("SHOPIFY_API_KEY"),
    secret=os.environ.get("SHOPIFY_SECRET_API_KEY")
)
