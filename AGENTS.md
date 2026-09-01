# AGENTS.md

## Project principles

- Keep the architecture serverless and Terraform-managed.
- Prefer simple code over premature abstractions.
- All AWS infrastructure must be declared in Terraform.
- Never commit AWS credentials, secrets, Terraform state, plans, or generated deployment packages.
- AWS runtime code must use AWS SDK v3 when AWS integration is added.
- S3 buckets must remain private when implemented.
- Region is `ap-northeast-1` unless a deliberate change is documented.

## Current scope boundaries

Do not add authentication, CloudFront, AI tagging, moderation, or deployment yet. Placeholder handlers must compile without contacting AWS.

## Quality gates

Before opening a PR, run formatting checks, linting, TypeScript type checking, tests, and build checks.
