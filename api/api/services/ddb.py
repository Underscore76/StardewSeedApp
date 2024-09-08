import os
import boto3
from boto3.dynamodb.conditions import Key
from mypy_boto3_dynamodb.service_resource import Table

table_name = os.environ.get("TABLE_NAME")


def get_table() -> Table:
    dynamodb = boto3.resource("dynamodb")
    return dynamodb.Table(table_name)


def get_job_by_id(user_id: str, job_id: str) -> dict:
    table = get_table()
    response = table.query(
        KeyConditionExpression=Key("user_id").eq(user_id) & Key("job_id").eq(job_id)
    )
    return response["Items"][0]
