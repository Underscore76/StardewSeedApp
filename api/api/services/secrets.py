import json
import os
from functools import cache
import boto3


@cache
def _get_secret_key() -> str:
    # if running locally, use a default secret key
    if os.environ.get("SECRET_ARN", None) is None:
        return "secret-key"

    # otherwise, use the secret key stored in AWS Secrets Manager
    client = boto3.client("secretsmanager")
    secret = client.get_secret_value(SecretId=os.environ["SECRET_ARN"])
    return json.loads(secret["SecretString"])["secret-key"]
