import { z } from 'zod';

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const MAX_DECODED_PIXELS = 25_000_000;
export const SUPPORTED_CONTENT_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

export const ImageStatusSchema = z.enum(['pending_upload', 'uploaded', 'processing', 'ready', 'failed']);
export type ImageStatus = z.infer<typeof ImageStatusSchema>;

export const ImageMetadataSchema = z.object({
  imageId: z.string().uuid(),
  fileName: z.string().min(1).max(255),
  contentType: z.enum(SUPPORTED_CONTENT_TYPES),
  sizeBytes: z.number().int().positive().max(MAX_UPLOAD_BYTES),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  createdAt: z.string().datetime()
}).superRefine((value, ctx) => {
  if (value.width !== undefined && value.height !== undefined && value.width * value.height > MAX_DECODED_PIXELS) {
    ctx.addIssue({ code: 'custom', message: 'Decoded image exceeds 25 megapixels', path: ['width'] });
  }
});
export type ImageMetadata = z.infer<typeof ImageMetadataSchema>;

export const CreateUploadRequestSchema = z.object({
  fileName: z.string().min(1).max(255),
  contentType: z.enum(SUPPORTED_CONTENT_TYPES),
  sizeBytes: z.number().int().positive().max(MAX_UPLOAD_BYTES)
});
export type CreateUploadRequest = z.infer<typeof CreateUploadRequestSchema>;

export const CreateUploadResponseSchema = z.object({
  imageId: z.string().uuid(),
  uploadUrl: z.url(),
  expiresAt: z.string().datetime()
});
export type CreateUploadResponse = z.infer<typeof CreateUploadResponseSchema>;

export const GetImageResponseSchema = z.object({
  status: ImageStatusSchema,
  metadata: ImageMetadataSchema.nullable(),
  error: z.string().nullable().optional()
});
export type GetImageResponse = z.infer<typeof GetImageResponseSchema>;
