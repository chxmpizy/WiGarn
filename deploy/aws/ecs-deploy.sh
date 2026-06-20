#!/bin/bash
# Sample script to build and push Docker images to ECR and update ECS services
set -e

if [ -z "$AWS_ACCOUNT_ID" ] || [ -z "$AWS_REGION" ]; then
  echo "AWS_ACCOUNT_ID and AWS_REGION must be set"
  exit 1
fi

REPO_WEB=wigarn-web
REPO_API=wigarn-api
TAG=${TAG:-latest}

# Build images
docker build -t $REPO_WEB:latest -f apps/web/Dockerfile .
docker build -t $REPO_API:latest -f apps/api/Dockerfile .

# Tag & push to ECR (assumes repos exist)
docker tag $REPO_WEB:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_WEB:$TAG
docker tag $REPO_API:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_API:$TAG

aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_WEB:$TAG
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_API:$TAG

# Note: Update ECS service tasks after pushing images using aws ecs update-service or use terraform
echo "Images pushed to ECR. Update ECS task definitions to use the new images."
