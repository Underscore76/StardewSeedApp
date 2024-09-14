from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import job
from api.routes import user

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:5173",
    "https://seed-find.underscore76.net",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(job.router)
