from functools import cache
import json
from decimal import Decimal
import os
from typing import Union
import boto3
from boto3.dynamodb.conditions import Key


from api.services.ssm import _get_ssm_param_value
from api.models.user import User
from api.models.job import Job, JobStatus
from boto3.dynamodb.types import TypeDeserializer


def serialize_number(number: str) -> Union[float, int]:
    if "." in number:
        return float(number)
    return int(number)


setattr(TypeDeserializer, "_deserialize_n", lambda _, number: serialize_number(number))


TABLE_NAME = _get_ssm_param_value("/seed-job-ddb/table-name")


def _get_table(name: str | None = None):
    if name is None:
        name = TABLE_NAME
    dynamodb = boto3.resource("dynamodb")
    return dynamodb.Table(name)


def get_job_by_id(user_id: str, job_id: str) -> Job | None:
    table = _get_table()
    response = table.query(
        KeyConditionExpression=Key("user_id").eq(user_id) & Key("job_id").eq(job_id)
    )
    if response["Items"]:
        return Job(**response["Items"][0])
    return None


def get_user_jobs(user_id: str) -> list[Job]:
    table = _get_table()
    response = table.query(KeyConditionExpression=Key("user_id").eq(user_id))
    return [Job(**r) for r in response["Items"] if r["job_id"] != "meta"]


def get_user_meta(user_id: str) -> User | None:
    table = _get_table()
    response = table.query(
        KeyConditionExpression=Key("user_id").eq(user_id) & Key("job_id").eq("meta")
    )
    if response["Items"]:
        return User(**response["Items"][0])
    return None


def post_user_meta(user: User):
    table = _get_table()
    table.put_item(Item=user.model_dump())


def post_job(job: Job):
    table = _get_table()
    table.put_item(Item=job.model_dump())


def update_job_status(user_id: str, job_id: str, status: JobStatus):
    table = _get_table()
    table.update_item(
        Key={"user_id": user_id, "job_id": job_id},
        UpdateExpression="SET #status = :status",
        ExpressionAttributeNames={"#status": "status"},
        ExpressionAttributeValues={":status": status},
    )


def check_hash(job_hash: str) -> Job | None:
    table = _get_table()
    response = table.query(
        IndexName="job_hash",
        KeyConditionExpression=Key("job_hash").eq(job_hash),
    )
    if response["Items"]:
        return Job(**response["Items"][0])
    return None


def delete_job(user_id: str, job_id: str) -> bool:
    table = _get_table()
    print(user_id, job_id)
    job = get_job_by_id(user_id, job_id)
    print(job)
    if job:
        table.delete_item(Key={"user_id": user_id, "job_id": job_id})
        return True
    return False
