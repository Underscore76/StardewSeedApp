import os
from fastapi import APIRouter, Depends, Response
from api.services.ssm import _get_ssm_param_value
from api.auth.token import get_cookie_user, get_discord_user

router = APIRouter(
    prefix="/user",
    tags=["user"],
)

DOMAIN_NAME = os.environ.get(
    "DOMAIN_NAME", _get_ssm_param_value("/route53/hostedzone/name")
)


def set_cookie(response: Response, key: str, value: str | None):
    if value is None:
        response.delete_cookie(key=key)
        return
    response.set_cookie(
        key=key,
        value=value,
        secure=True,
        samesite="strict",
        httponly=True,
        domain=DOMAIN_NAME,
    )


@router.post("/token")
def login(response: Response, user: tuple[str, str] = Depends(get_discord_user)):
    set_cookie(response, "user_id", user[0])
    set_cookie(response, "user_hash", user[1])
    response.status_code = 200
    return response


@router.get("/check")
def check_user(user_id: str = Depends(get_cookie_user)):
    return {"user_id": user_id}


@router.post("/logout")
def logout(response: Response):
    set_cookie(response, "user_id", None)
    set_cookie(response, "user_hash", None)
    response.status_code = 200
    return response
