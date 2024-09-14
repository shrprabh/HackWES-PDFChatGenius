import React, { useState, ChangeEvent } from 'react';
import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-west-1' // Replace with your S3 bucket's region
});

const s3 = new AWS.S3();

const PDFUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const uploadToS3 = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const params: AWS.S3.PutObjectRequest = {
      Bucket: 'hackwestx', // Replace with your S3 bucket name
      Key: `PDFs/${Date.now()}-${file.name}`, // File path in S3
      Body: file,
      ContentType: file.type,
      ACL: 'public-read' // This makes the file publicly accessible
    };

    try {
      const { Location } = await s3.upload(params).promise();
      console.log('File uploaded successfully');
      console.log('Public URL:', Location);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="application/pdf" />
      <button onClick={uploadToS3}>Upload PDF</button>
    </div>
  );
};

export default PDFUploader;