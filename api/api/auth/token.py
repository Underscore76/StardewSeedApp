import sqlite3
import bcrypt
import httpx
from fastapi import HTTPException, Depends, Request, Response
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from api.models.user import User
from api.services.ddb import post_user_meta

security = HTTPBearer()

secret_key = "secret"


async def get_discord_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> tuple[str, str]:
    """
    validate the token so we can generate a hash of the user's id
    """
    token = credentials.credentials
    user_response = httpx.get(
        "https://discord.com/api/users/@me",
        headers={"Authorization": f"Bearer {token}"},
    )
    if user_response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_data = user_response.json()
    user_data["user_id"] = user_data.pop("id")
    user = User.model_validate(user_data)
    post_user_meta(user)

    # spoof storing the session in a database
    hashed_user_id = bcrypt.hashpw(
        (user.user_id + secret_key).encode("utf-8"), bcrypt.gensalt()
    ).decode("utf-8")
    return user.user_id, hashed_user_id


async def get_cookie_user(request: Request) -> str:
    hashed_user_id = request.cookies.get("user_hash")
    user_id = request.cookies.get("user_id")
    if hashed_user_id is None or user_id is None:
        raise HTTPException(status_code=401)
    # lookup session in database
    if not bcrypt.checkpw(
        (user_id + secret_key).encode("utf-8"), hashed_user_id.encode("utf-8")
    ):
        raise HTTPException(status_code=401)
    return user_id
