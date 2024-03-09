// utils/queue.js

import Queue from 'bull';

export const fileQueue = new Queue('fileQueue');

fileQueue.process(async (job) => {
  const { userId, fileId } = job.data;

  if (!fileId) {
    throw new Error('Missing fileId');
  }

  if (!userId) {
    throw new Error('Missing userId');
  }

  const file = await dbClient.files.findOne({ _id: fileId, userId });

  if (!file) {
    throw new Error('File not found');
  }

  const imagePath = `/tmp/files_manager/${file.id}`;
  const sizes = [500, 250, 100];

  await Promise.all(sizes.map(async (size) => {
    const thumbnailPath = `${imagePath}_${size}`;
    await generateThumbnails({
      source: imagePath,
      destination: thumbnailPath,
      width: size,
    });
  }));
});
