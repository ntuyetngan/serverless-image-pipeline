# Architecture

## Target flow

```text
Browser
  |
  | POST upload intent
  v
Upload API (Lambda)
  |
  | presigned PUT URL
  v
Private S3 uploads bucket
  |
  | object-created event
  v
Image Processor (Lambda)
  |-- validate decoded image <= 25 MP
  |-- generate thumbnails
  |-- write thumbnail(s) to private S3
  `-- persist status + metadata
            |
            v
      Status API (Lambda)
            |
            v
          Browser
```

## Initial boundaries

This repository currently contains only contracts, placeholder Lambda handlers, workspace/build tooling, Terraform declarations, documentation, and CI. No handler contacts AWS and no Terraform resources are created.

## Validation limits

- MIME types: JPEG (`image/jpeg`), PNG (`image/png`), WebP (`image/webp`)
- Maximum uploaded object size: 10 MiB
- Maximum decoded pixel count: 25,000,000 pixels

The upload API can enforce declared content type and content length. The processor must independently inspect the actual image before processing because client-provided metadata is untrusted.

## Infrastructure principles

- Terraform owns all AWS infrastructure.
- Buckets are private.
- Generated deployment artifacts and Terraform state are never committed.
- Default AWS region is `ap-northeast-1`.
