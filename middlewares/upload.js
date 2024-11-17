const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (fileStream, bucketName, key) => {
  try {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: bucketName,
        Key: key,
        Body: fileStream,
        ACL: 'public-read',
      },
    });

    upload.on('httpUploadProgress', progress => {
      console.log(progress);
    });

    const result = await upload.done();
    console.log('File uploaded successfully:', result);
    return result;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

module.exports = uploadFile;
