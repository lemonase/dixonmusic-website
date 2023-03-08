import os
import psycopg2

from dotenv import load_dotenv
load_dotenv()

conn = psycopg2.connect(database="postgres",
                        host="localhost",
                        user=os.environ.get("PG_USER"),
                        password=os.environ.get("PG_PASSWORD"),
                        port="5432")


cursor = conn.cursor()

create_db = """
CREATE TABLE IF NOT EXISTS discogs_inventory (
  id serial PRIMARY KEY,
  release_id BIGINT,
  resource_url TEXT,
  uri TEXT,
  status TEXT,
  condition TEXT,
  sleeve_condition TEXT,
  comments TEXT,
  date_posted TEXT,
  -- date_posted TIMESTAMPTZ,
  -- release fields
  thumbnail TEXT,
  description TEXT,
  images TEXT,
  artist TEXT,
  format TEXT,
  sell_item_id BIGINT,
  catalog_number TEXT,
  title TEXT,
  year INT,
  price TEXT
);
"""

seed_data = """
INSERT INTO discogs_inventory(
  release_id,
  resource_url,
  uri,
  status,
  condition,
  sleeve_condition,
  comments,
  date_posted,
  -- thumbnail,
  description,
  -- images,
  artist,
  format,
  sell_item_id,
  catalog_number,
  title,
  year,
  price
)
VALUES (
  2391951142,
  'https://api.discogs.com/marketplace/listings/2391951142',
  'https://www.discogs.com/sell/item/2391951142',
  'For Sale',
  'Mint (M)',
  'Near Mint (NM or M-)',
  'Open not sealed - Unplayed Discs Like New',
  '2023-02-10T16:38:17-08:00',
  '23 Skidoo - Dawning (CD, Single)',
  '23 Skidoo',
  'CD, Single',
  '787588',
  'VSCDT 1771, 7243 8 96732 2 7',
  'Dawning',
  2000,
  '7.5'
);
"""

cursor.execute("SELECT * FROM discogs_inventory WHERE id = 1")
print(cursor.fetchone())

conn.close()
