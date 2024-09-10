FROM public.ecr.aws/docker/library/python:3.12 AS build
WORKDIR /app

# Install Poetry
ARG POETRY_VERSION=1.8

ENV POETRY_HOME=/opt/poetry
ENV POETRY_NO_INTERACTION=1
ENV POETRY_VIRTUALENVS_IN_PROJECT=1
ENV POETRY_VIRTUALENVS_CREATE=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Tell Poetry where to place its cache and virtual environment
ENV POETRY_CACHE_DIR=/opt/.cache

RUN pip install "poetry==${POETRY_VERSION}"

WORKDIR /app

COPY poetry.lock pyproject.toml README.md ./
RUN poetry install --without dev && rm -rf $POETRY_CACHE_DIR

COPY api api

# https://github.com/awslabs/aws-lambda-web-adapter/blob/main/examples/fastapi/app/Dockerfile
FROM public.ecr.aws/docker/library/python:3.12-slim AS runtime
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter

WORKDIR /app

COPY --from=build /app/.venv .venv

COPY api api

ENV PATH="/app/.venv/bin:$PATH"
ENV PORT=8000
ENV PYTHONUNBUFFERED=1

CMD exec fastapi run api/main.py