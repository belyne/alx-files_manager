// worker.js
import Bull from 'bull';
import { ObjectId } from 'mongodb';
import dbClient from './utils/db';
import imageThumbnail from 'image-thumbnail';

const fileQueue = new Bull('fileQueue');

fileQueue.process(async (job) => {
  const { userId, fileId } = job.data;

  if (!fileId) {
    throw new Error('Missing fileId');
  }

  if (!userId) {
    throw new Error('Missing userId');
  }

  const file = await dbClient.db.collection('files').findOne({
    _id: ObjectId(fileId),
    userId: ObjectId(userId),
  });

  if (!file) {
    throw new Error('File not found');
  }

  const filePath = file.localPath || '';

  if (!fs.existsSync(filePath)) {
    throw new Error('File not found');
  }

  await imageThumbnail({ source: filePath, width: 500 })
    .then((thumbnail) => fs.writeFileSync(`${filePath}_500`, thumbnail));

  await imageThumbnail({ source: filePath, width: 250 })
    .then((thumbnail) => fs.writeFileSync(`${filePath}_250`, thumbnail));

  await imageThumbnail({ source: filePath, width: 100 })
    .then((thumbnail) => fs.writeFileSync(`${filePath}_100`, thumbnail));

  return true;
});

export default fileQueue;
