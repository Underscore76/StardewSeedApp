from pydantic import BaseModel


class User(BaseModel):
    user_id: str
    job_id: str = "meta"
    username: str
    avatar: str
    global_name: str
