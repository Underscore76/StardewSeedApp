# StardewSeedApp

![](https://github.com/Underscore76/StardewSeedApp/actions/workflows/cfn.yml/badge.svg)
[![Deploying Runner](https://github.com/Underscore76/StardewSeedApp/actions/workflows/runner.yml/badge.svg)](https://github.com/Underscore76/StardewSeedApp/actions/workflows/runner.yml)
[![Deploying API](https://github.com/Underscore76/StardewSeedApp/actions/workflows/api.yml/badge.svg)](https://github.com/Underscore76/StardewSeedApp/actions/workflows/api.yml)
[![Deploying Web App](https://github.com/Underscore76/StardewSeedApp/actions/workflows/app.yml/badge.svg)](https://github.com/Underscore76/StardewSeedApp/actions/workflows/app.yml)

This project is a standalone web application for searching for seeds in Stardew Valley 1.6, hosted on AWS. User authentication is through Discord OAuth2, which uses a user's unique id to track their jobs and preferences. The application is broken into 3 distinct parts:

* Frontend - React (Typescript, tailwindcss, react-router v6) hosted on AWS S3/Cloudfront
* Backend - FastAPI (Python) running on AWS Lambda with DynamoDB for metadata storage
* Runner - .NET 6 (C#) containers running on AWS Fargate

## App todo:
* [ ] Create widget for item quests
* [ ] Add requirement block for remix bundles
* [ ] Add requirement block for cart
    * cart has two types of checks
        1. does this item exist before X date
        2. does this item exist on X date
* [ ] Add requirement block for trash cans
* [ ] fix job result view page
* [ ] On create - pop a modal with the raw json payload of the job with json schema syntax highlighting so someone can review/modify in place before doing the final ship. (on approve of this modal, create job api is triggered which launches the runner)
* [ ] Add types to API/runner for new requirements
* [ ] Add checks for new requirements to runner

NOTE: in 1.6.4 geodes became impossible to seed for as they require your uniqueMultiplayerId which is not controllable by the user. Supporting earlier versions would want to support that capability.
 

## Deploy TODO:
* [X] Build basic .NET container to run a json file as a seed search
* Deploy API to AWS Lambda behind API Gateway
    * [ ] **launch an ECS task to run the job**
    * [X] dockerize the FastAPI app with LWA
    * [X] ECR for container image
    * [X] Deploy lambda
    * [X] API Gateway to route traffic from route53 (seed-api.underscore76.net)
    * [X] IAM policies for:
        * [X] DynamoDB
        * [X] Cloudwatch
        * [X] SSM
        * [X] Secrets Manager
        * [X] ecs (describe tasks/run tasks)
* Deploy Frontend to AWS S3/Cloudfront
    * [X] S3 bucket for hosting
    * [X] Cloudfront distribution
    * [X] build and deploy node on github actions
    * [X] Route53 record set for subdomain (seed-find.underscore76.net)
    * [X] gha runner IAM policies for:
        * S3
        * Cloudfront
        * Route53
* Deploy Runner as TaskDefinition to AWS Fargate
    * [X] Fargate Cluster to run the tasks in
    * [X] ECR for container image
    * [X] build and push container image to ECR with github actions
    * [X] TaskDefinition for running the container
    * [X] IAM policies for:
        * DynamoDB


## testing notes
* Want to continue looking at speed testing the api, the api feels incredibly slow at low memory (at 256 it's like 2-3s per request vs at 1024 it's like 650-800ms and 2048 it's like 450ms)
    * localhost requests are slow as dirt also so probably need to dig into why that is
    * cold starts are pretty bad but also the scale to 0 is nice
    * I wonder if I'm just eating a ton of damage in start times?
    * wonder how other languages/platforms handle this efficiently
    * might've just been bcrypt being slow? moving from 12 to 4 rounds made a huge difference
    * **Final Result**: lowering bcrypt rounds dramatically improved runtime (450ms at 256MB, 250ms at 512MB, 200ms at 1024MB). Going to settle on 512MB for now as a good sweet spot.
* Need to figure out container sizing (2 day rain check for 20M seeds took maybe 2min from launch to finish (maybe 90s of job time) on a 1vCPU/2GB container). The question will be what are the diminishing returns on parallel.foreach/vcpus.

# Running locally

We are using npm to manage basic run scripts for both the frontend and backend right now, to run them simultaneously at the top level of this repo run `npm install` to get [concurrently](https://github.com/open-cli-tools/concurrently#readme). then run `npm run dev` to start both the frontend and backend.

## Building frontend
* frontend uses npm for dependency management
* `cd frontend && npm install` to install dependencies
* to run the frontend from the root directory `npm run app`

## Building backend

* backend python uses [poetry](https://python-poetry.org/) for dependency management
* `cd api && poetry install` to install dependencies
* to run the api from the root directory `npm run api`
