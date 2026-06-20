AWS deployment notes for WiGarn

This folder includes sample steps to deploy to AWS using ECS + Fargate.

Steps:

1. Build and push Docker images for `web` and `api` to ECR.
2. Create ECS task definitions referencing images and environment variables.
3. Create an RDS Postgres instance and set `DATABASE_URL` in Secrets Manager.
4. Use CloudFormation or Terraform to wire up the stack.

Notes:

- This is a sample; adapt for your infra. Do not run in production without review.
