import hashlib
import enum
from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field

from api.models.requirements import JobRequirements


class JobStatus(str, enum.Enum):
    pending = "pending"
    running = "running"
    complete = "complete"
    failed = "failed"


def current_timestamp():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class Job(BaseModel):
    user_id: str
    payload: JobRequirements

    start_time: Optional[str] = None
    end_time: Optional[str] = None
    status: Optional[JobStatus] = Field(default=JobStatus.pending)

    job_id: Optional[str] = None
    job_hash: Optional[str] = None
    seeds: Optional[list[int]] = None

    def __init__(self, **data):
        if "job_hash" not in data:
            payload: JobRequirements = data["payload"]
            data["job_hash"] = hashlib.sha256(
                payload.model_dump_json().encode("utf-8")
            ).hexdigest()
        if "start_time" not in data:
            data["start_time"] = current_timestamp()
        if "seeds" in data:
            if not data["seeds"]:
                data["seeds"] = []
        data["job_id"] = data["job_hash"][:8]
        super().__init__(**data)
