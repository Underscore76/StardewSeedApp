from functools import cache
import boto3


@cache
def _get_ssm_param_value(name: str) -> str:
    ssm = boto3.client("ssm")
    param = ssm.get_parameter(Name=name)
    return param["Parameter"]["Value"]
