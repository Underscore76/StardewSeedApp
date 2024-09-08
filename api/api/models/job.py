import hashlib
import enum
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class JobStatus(str, enum.Enum):
    pending = "pending"
    running = "running"
    complete = "complete"
    failed = "failed"


class JobRequest(BaseModel):
    start_seed: int = Field(default=0)
    end_seed: int = Field(default=100_000)
    weather: Optional[str] = Field(default="")
    location: Optional[str] = Field(default="")


def current_timestamp():
    return datetime.now().isoformat(timespec="seconds")


class Job(BaseModel):
    user_id: str
    payload: JobRequest

    start_time: Optional[str] = None
    end_time: Optional[str] = None
    status: Optional[JobStatus] = Field(default=JobStatus.pending)

    job_id: Optional[str] = None
    job_hash: Optional[str] = None

    def __init__(self, **data):
        if "job_hash" not in data:
            payload: JobRequest = data["payload"]
            data["job_hash"] = hashlib.sha256(
                payload.model_dump_json().encode("utf-8")
            ).hexdigest()
        if "start_time" not in data:
            data["start_time"] = current_timestamp()
        data["job_id"] = data["job_hash"][:8]
        super().__init__(**data)


if __name__ == "__main__":
    a = Job(
        user_id="1",
        payload=JobRequest(weather="sunny", location="here"),
    )
    print(a)
    print(a.model_dump_json())
