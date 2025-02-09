import { Request, Response, NextFunction } from 'express';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: 'memed-project-23',
  keyFilename: process.env.GCP_CREDENTIALS
});

const bucketName = 'skripsi_uin_bucket';
const bucket = storage.bucket(bucketName);

function imgUrlBucket(filename: string): string {
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

// Kita buat interface untuk menambahkan properti custom di `req.file`
interface MulterGoogleCloudFile extends Express.Multer.File {
  cloudStorageError?: any;
  cloudStorageObject?: string;
  cloudStoragePublicUrl?: string;
}

const bucketUpload = {
  uploadToBucket: (req: Request, res: Response, next: NextFunction): void => {
    if (!req.file) return next();

    const fileUpload = req.file as MulterGoogleCloudFile;

    const timeStamp = new Date().getTime();
    const imgName = `${timeStamp}-${fileUpload.originalname}`;

    let path = '';
    if (req.file.fieldname === 'image') {
      path = 'post_img/';
    } else if (req.file.fieldname === 'post_img') {
      path = 'admin_post_img/';
    }

    const gcsname = path + imgName;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
      metadata: {
        contentType: fileUpload.mimetype,
      }
    });

    stream.on('error', (err) => {
      fileUpload.cloudStorageError = err;
      next(err);
    });

    stream.on('finish', async () => {
      fileUpload.cloudStorageObject = gcsname;
      fileUpload.cloudStoragePublicUrl = imgUrlBucket(gcsname);

      try {
        await file.makePublic();
        fileUpload.cloudStoragePublicUrl = imgUrlBucket(gcsname);
        next();
      } catch (error) {
        next(error);
      }
    });

    stream.end(fileUpload.buffer);
  }
};

// Bisa memakai export default atau export named
export { bucketUpload, MulterGoogleCloudFile };
