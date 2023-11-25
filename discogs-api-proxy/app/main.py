from typing import Union
import os

from fastapi import FastAPI
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
import requests
import requests_cache

load_dotenv()

requests_cache.install_cache(
    'discogs_cache', backend='sqlite', expire_after=3600)

# Discogs API docs:
# https://www.discogs.com/developers

user_name = os.environ.get("DIXONMUSIC_USERNAME")
api_token = os.environ.get("DIXONMUSIC_API_TOKEN")

def fetch_inventory(user_name=user_name,
                    api_token=api_token,
                    page=1,
                    per_page=100
                    ):
    api_url = f"https://api.discogs.com/users/{user_name}/inventory"

    query_params = {
        "token": api_token,
        "page": page,
        "per_page": per_page
    }
    res = requests.get(api_url, params=query_params)
    data = res.json()
    return data


def get_primary_image(images):
    if images is None:
        return None
    for image in images:
        if image.get("type") == "primary":
            return image

    return images[0]


origins = [
    "http://localhost",
    "https://localhost",
    "http://localhost:5173/",
    "http://dixonmusic.net",
    "https://dixonmusic.net",
]

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )
]


app = FastAPI(middleware=middleware)


@app.get("/")
async def root():
    return {"message": "Backend API server for dixonmusic.net. This is a proxy/cache server to the official Discogs API."}


@app.get("/hello/")
async def hello():
    return {"message": f"Hello, {user_name}!"}


@app.get("/ping/")
async def ping():
    return {"message": "pong"}


@app.get("/inventory/")
async def listings(page: Union[int, None] = 1,
                   per_page: Union[int, None] = 100,
                   ):
    return fetch_inventory(page=page, per_page=per_page)
