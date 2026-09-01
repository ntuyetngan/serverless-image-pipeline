import type { S3Handler } from 'aws-lambda';

export const handler: S3Handler = async (event) => {
  console.info('Image processor placeholder received event records.', {
    recordCount: event.Records.length,
  });
};
