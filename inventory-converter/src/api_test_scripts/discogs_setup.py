import discogs_client
import os
from dotenv import load_dotenv
load_dotenv()


d = discogs_client.Client("Inventory Fetcher/0.1",
                          user_token=os.environ.get("DIXONMUSIC_API_TOKEN"))


user = d.user("dixonmusic")
inventory = user.inventory


def get_dixonmusic_inventory():
    pass
