from typing import Union
from fastapi import FastAPI

import discogs_api

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/inventory/")
async def listings(page: Union[int, None] = 1,
                   per_page: Union[int, None] = 100,
                   ):
    return discogs_api.get_inventory(page=page, per_page=per_page)
