import sqlite3
import bcrypt
import httpx
from fastapi import HTTPException, Depends, Request, Response
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

security = HTTPBearer()

secret_key = "secret"

conn = sqlite3.connect("tutorial.db")


def setup_db():
    cur = conn.cursor()
    cur.execute(
        "CREATE TABLE IF NOT EXISTS TableName (user_id TEXT PRIMARY KEY, session_token TEXT)"
    )


setup_db()


def upsert_user(user_id: str, session_token: str):
    cur = conn.cursor()
    token = get_token_by_id(user_id)
    if token:
        cur.execute(
            "UPDATE TableName SET session_token=? WHERE user_id=?",
            (session_token, user_id),
        )
        conn.commit()
        return
    cur.execute(
        "INSERT INTO TableName (user_id, session_token) VALUES (?, ?)",
        (user_id, session_token),
    )
    conn.commit()


def get_token_by_id(user_id: str):
    cur = conn.cursor()
    cur.execute("SELECT session_token FROM TableName WHERE user_id = ?", (user_id,))
    return cur.fetchone()


def get_id_by_token(session_token: str):
    cur = conn.cursor()
    cur.execute(
        "SELECT user_id FROM TableName WHERE session_token = ?", (session_token,)
    )
    return cur.fetchone()


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
    user = user_response.json()
    user_id: str = user["id"]

    # spoof storing the session in a database
    hashed_user_id = bcrypt.hashpw(
        (user_id + secret_key).encode("utf-8"), bcrypt.gensalt()
    ).decode("utf-8")
    upsert_user(user_id, hashed_user_id)
    return user_id, hashed_user_id


async def get_cookie_user(request: Request):
    hashed_user_id = request.cookies.get("user_id")
    if hashed_user_id is None:
        raise HTTPException(status_code=401, detail="cookie not set")
    # lookup session in database
    user_id = get_id_by_token(hashed_user_id)
    if user_id:
        return user_id[0]
    raise HTTPException(status_code=401, detail="Invalid cookie")
