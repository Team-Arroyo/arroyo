import  { getObjectContents, getBucketObjectsWithinDates } from '../lib/s3Client.mjs';
import getAllBucketObjectKeys from '../aws/s3/getAllBucketObjectKeys.mjs'
import { streamToString } from  '../utils/streamToString.mjs';
import { logStringToJson } from '../utils/logStringToJson.mjs';
import { postToLogstash } from '../services/logstashService.mjs';

export const getS3Objects = async(req, res) => {
  const dateError = req.dateError;
  const startDate = req.startDate;
  const endDate = req.endDate;

  if(dateError) {
    res.status(400).send({dateError});
    return;
  }

  try {
    let objectKeys;

    if(!!startDate && !!endDate) {
      console.log('date supplied');
      objectKeys = await getBucketObjectsWithinDates({ startDate, endDate });
    } else {
      console.log('No date supplied');
      objectKeys = await getAllBucketObjectKeys({ Bucket: process.env.AWS_BUCKET_NAME });
    }

    res.send({objectKeys});
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).send({
      message: 'Fetching object from S3 failed, see error message for more details', 
      error
    });
  }
};

export const rehydrateS3Object = async(req, res) => {
  try {
    const { objectKey } = req.body;
    const data = await getObjectContents(objectKey);
    const rawLogString = await streamToString(data.Body);
    const logsJson = logStringToJson(rawLogString);
    await postToLogstash(logsJson);
    res.status(202).json({
      message: `Rehydrate on ${objectKey} in progress`,
    })
  } catch(error) {
    console.log('Error: ', error);
    res.status(500).send({
      message: 'Log rehydration failed, see error message for more details', 
      error
    });
  }
};

export const rehydrateFullS3Object = async(objectKey) => {
  return new Promise(async(resolve, reject) => {
    try {
      console.log('normal_ingest', objectKey);
      //const data = await getObjectContents(objectKey)
      //const rawLogString = await streamToString(data.Body);
      //const logsJson = logStringToJson(rawLogString);
      //await postToLogstash(logsJson);
      resolve({objectKey, status: 'complete'});
    } catch(err) {
      reject({objectKey, status: 'fail', error: err});
    }
  });
};