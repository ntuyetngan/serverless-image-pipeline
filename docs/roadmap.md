# Roadmap

## Phase 0 — scaffold

- Monorepo/workspaces
- Shared API contracts and validation
- Placeholder Lambda handlers
- Terraform provider/version declarations
- CI quality gates

## Phase 1 — upload path

- Private uploads S3 bucket
- Upload API Lambda + API Gateway
- Presigned PUT URLs
- DynamoDB status/metadata table
- Terraform remote-state bootstrap

## Phase 2 — image processing

- S3 event trigger
- Decode and verify image dimensions
- Thumbnail generation
- Private thumbnail storage
- Processing status transitions and failure handling

## Phase 3 — web demo

- Minimal upload UI
- Status polling
- Thumbnail display through a deliberately selected access pattern

## Explicitly deferred

Authentication, CloudFront, AI tagging, moderation, and production deployment automation.
