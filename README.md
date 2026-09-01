# Serverless Image Pipeline

A Terraform-managed, serverless AWS portfolio project for uploading images and generating thumbnails.

## Initial architecture

1. `upload-api` validates upload intent and will eventually issue a presigned S3 URL.
2. A client uploads an image to a private S3 bucket.
3. `image-processor` will react to the upload, validate decoded dimensions, generate thumbnails, and persist metadata/status.
4. `status-api` will return processing state and image metadata.
5. `web` will provide a minimal upload/status UI.

The initial scaffold intentionally does **not** create AWS resources or contact AWS from runtime code.

## Stack

- TypeScript + Node.js 24
- pnpm workspaces
- esbuild
- Vitest
- AWS SDK v3
- Zod
- Terraform
- AWS region: `ap-northeast-1`

## Requirements

- Node.js 24
- pnpm 10+
- Terraform 1.10+

## Setup

```bash
corepack enable
pnpm install
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Terraform is scaffold-only for now:

```bash
terraform -chdir=infrastructure/bootstrap fmt -check
terraform -chdir=infrastructure/environments/dev fmt -check
```

Do not run `terraform apply` yet. No AWS resources are defined in this initial version.

See [docs/architecture.md](docs/architecture.md) and [docs/roadmap.md](docs/roadmap.md).
