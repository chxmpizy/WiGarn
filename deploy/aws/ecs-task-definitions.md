Sample ECS task definition steps

1. Create ECR repositories and push `wigarn-web` and `wigarn-api` images.
2. Create task definitions for web and api using Fargate.
3. Use Secrets Manager for DATABASE_URL and other secrets.
4. Configure ALB for web service and internal service for API.

Example fields omitted — adapt to your account.
