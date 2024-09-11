from fastapi import APIRouter, Depends
from api.models.requirements import JobRequirements
from api.auth.token import get_cookie_user
from api.models.job import Job
from api.services import ddb

router = APIRouter(
    prefix="/job",
    tags=["job"],
)


@router.post("")
def create_job(job: JobRequirements, user_id: str = Depends(get_cookie_user)):
    job = Job(user_id=user_id, payload=job)
    ddb.post_job(job)
    return job


@router.get("")
def get_jobs(user_id: str = Depends(get_cookie_user)):
    jobs = ddb.get_user_jobs(user_id)
    return jobs


@router.get("/{job_id}")
def get_job(job_id: str, user_id: str = Depends(get_cookie_user)):
    job = ddb.get_job_by_id(user_id, job_id)
    return job


@router.get("/{job_id}/status")
def get_job_stats(job_id: str, user_id: str = Depends(get_cookie_user)):
    job = ddb.get_job_by_id(user_id, job_id)
    return job.status


@router.get("/shared/{combo_id}")
def get_shared_job(combo_id: str, user_id: str = Depends(get_cookie_user)):
    (share_user_id, share_job_id) = combo_id.split(".")
    job = ddb.get_job_by_id(share_user_id, share_job_id)
    user = ddb.get_user_meta(share_user_id)
    return dict(user=user, job=job)


@router.delete("/{job_id}")
def delete_job(job_id: str, user_id: str = Depends(get_cookie_user)):
    success = ddb.delete_job(user_id, job_id)
    return success
