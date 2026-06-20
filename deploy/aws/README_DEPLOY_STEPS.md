Quick deploy steps

1. Set environment variables:
   - AWS_ACCOUNT_ID
   - AWS_REGION
   - TAG (optional, default: latest)
2. Ensure ECR repositories exist for `wigarn-web` and `wigarn-api`.
3. Run `./deploy/aws/ecs-deploy.sh` to build, tag and push images to ECR.
4. Update ECS task definitions to point to the new images and update services.
