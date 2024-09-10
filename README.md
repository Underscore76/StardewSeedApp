# StardewSeedApp

![](https://github.com/Underscore76/StardewSeedApp/actions/workflows/cfn.yml/badge.svg)


This project is a standalone web application for searching for seeds in Stardew Valley 1.6, hosted on AWS. User authentication is through Discord OAuth2, which uses a user's unique id to track their jobs and preferences. The application is broken into 3 distinct parts:

* Frontend - React (Typescript, tailwindcss, react-router v6) hosted on AWS S3/Cloudfront
* Backend - FastAPI (Python) running on AWS Lambda with DynamoDB for metadata storage
* Runner - .NET 6 (C#) containers running on AWS Fargate

## Current Status:
* Discord OAuth2 login and user session cookies are working
* Sorted out github action connections to AWS account
* Deployed DynamoDB table
* (local) Basic FastAPI CRUD operations for working with deployed ddb table
* (local) Frontend scaffold calling the local backend
* Basic concept of job sharing (by passing `user_id.job_id`)
* Want to continue looking at speed testing the api, the docs page is incredibly slow but the actual api seems fine


## TODO:
* [X] Build basic .NET container to run a json file as a seed search
* Deploy API to AWS Lambda behind API Gateway
    * [X] dockerize the FastAPI app with LWA
    * [X] ECR for container image
    * [X] Deploy lambda
    * [X] API Gateway to route traffic from route53 (seed-api.underscore76.net)
    * [ ] IAM policies for:
        * [X] DynamoDB
        * [X] Cloudwatch
        * [ ] S3
        * [X] SSM
        * [X] Secrets Manager
        * [ ] ecs (describe tasks/run tasks)
* Deploy Frontend to AWS S3/Cloudfront
    * [ ] S3 bucket for hosting
    * [ ] Cloudfront distribution
    * [ ] Codebuild job to deploy and create invalidation
    * [ ] Route53 record set for subdomain (sdv-seed.underscore76.net?)
    * [ ] IAM policies for:
        * S3
        * Cloudfront
        * Route53
* Deploy Runner as TaskDefinition to AWS Fargate
    * [ ] Fargate Cluster to run the tasks in
    * [ ] ECR for container image
    * [ ] build and push container image to ECR with github actions
    * [ ] TaskDefinition for running the container
    * [ ] IAM policies for:
        * S3
        * DynamoDB

# Running locally

We are using npm to manage basic run scripts for both the frontend and backend right now, to run them simultaneously at the top level of this repo run `npm install` to get [concurrently](https://github.com/open-cli-tools/concurrently#readme).

## Building frontend
* frontend uses npm for dependency management
* `cd frontend && npm install` to install dependencies
* to run the frontend from the root directory `npm run app`

## Building backend

* backend python uses [poetry](https://python-poetry.org/) for dependency management
* `cd api && poetry install` to install dependencies
* to run the api from the root directory `npm run api`
