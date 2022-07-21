import s3Client from '../clients/s3Client.mjs'; 
import { GetObjectCommand } from '@aws-sdk/client-s3';

const downloadObjectFromBucket = async (bucketParams) => {
  try {
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    return data; 
  } catch (err) {
    console.log('Error', err);
  }
};

export default downloadObjectFromBucket;
