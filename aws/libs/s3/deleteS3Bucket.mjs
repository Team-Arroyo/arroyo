import s3Client from "../clients/s3Client.mjs"; 
import { DeleteBucketCommand } from "@aws-sdk/client-s3";

const deleteS3Bucket = async (bucketName) => {
  try {
    const data = await s3Client.send(new DeleteBucketCommand(bucketName));
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export default deleteS3Bucket;