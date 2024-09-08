from fastapi import APIRouter, Depends, Response
from api.auth.token import get_cookie_user, get_discord_user

router = APIRouter(
    prefix="/user",
    tags=["user"],
)


@router.post("/token")
def login(response: Response, hashed_user_id: str = Depends(get_discord_user)):
    response.set_cookie(
        key="user_id",
        value=hashed_user_id,
        secure=True,
        samesite="strict",
        httponly=True,
    )
    response.status_code = 200
    return response


@router.get("/check")
def check_user(user_id: str = Depends(get_cookie_user)):
    return {"user_id": user_id}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="user_id")
    response.status_code = 200
    return response
