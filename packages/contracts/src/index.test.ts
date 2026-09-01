import { describe, expect, it } from 'vitest';
import {
  CreateUploadRequestSchema,
  CreateUploadResponseSchema,
  GetImageResponseSchema,
  ImageMetadataSchema,
  ImageStatusSchema,
  MAX_UPLOAD_BYTES
} from './index.js';

const id = '550e8400-e29b-41d4-a716-446655440000';
const now = '2026-09-01T00:00:00.000Z';

describe('ImageStatus', () => {
  it('accepts defined statuses and rejects unknown values', () => {
    expect(ImageStatusSchema.parse('ready')).toBe('ready');
    expect(ImageStatusSchema.safeParse('unknown').success).toBe(false);
  });
});

describe('ImageMetadata', () => {
  it('accepts supported metadata', () => {
    expect(ImageMetadataSchema.parse({ imageId: id, fileName: 'photo.webp', contentType: 'image/webp', sizeBytes: 1024, width: 4000, height: 3000, createdAt: now }).imageId).toBe(id);
  });

  it('rejects unsupported content types, files over 10 MB, and images over 25 MP', () => {
    expect(ImageMetadataSchema.safeParse({ imageId: id, fileName: 'photo.gif', contentType: 'image/gif', sizeBytes: 100, createdAt: now }).success).toBe(false);
    expect(ImageMetadataSchema.safeParse({ imageId: id, fileName: 'photo.jpg', contentType: 'image/jpeg', sizeBytes: MAX_UPLOAD_BYTES + 1, createdAt: now }).success).toBe(false);
    expect(ImageMetadataSchema.safeParse({ imageId: id, fileName: 'huge.png', contentType: 'image/png', sizeBytes: 100, width: 6000, height: 5000, createdAt: now }).success).toBe(false);
  });
});

describe('CreateUploadRequest', () => {
  it.each(['image/jpeg', 'image/png', 'image/webp'] as const)('accepts %s', (contentType) => {
    expect(CreateUploadRequestSchema.safeParse({ fileName: 'image', contentType, sizeBytes: MAX_UPLOAD_BYTES }).success).toBe(true);
  });

  it('rejects unsupported files and oversized uploads', () => {
    expect(CreateUploadRequestSchema.safeParse({ fileName: 'x.gif', contentType: 'image/gif', sizeBytes: 1 }).success).toBe(false);
    expect(CreateUploadRequestSchema.safeParse({ fileName: 'x.png', contentType: 'image/png', sizeBytes: MAX_UPLOAD_BYTES + 1 }).success).toBe(false);
  });
});

describe('CreateUploadResponse', () => {
  it('validates the upload contract', () => {
    expect(CreateUploadResponseSchema.safeParse({ imageId: id, uploadUrl: 'https://example.com/upload', expiresAt: now }).success).toBe(true);
  });
});

describe('GetImageResponse', () => {
  it('validates status responses with and without metadata', () => {
    expect(GetImageResponseSchema.safeParse({ status: 'processing', metadata: null }).success).toBe(true);
    expect(GetImageResponseSchema.safeParse({ status: 'failed', metadata: null, error: 'processing failed' }).success).toBe(true);
  });
});
