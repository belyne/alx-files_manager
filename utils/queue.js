// controllers/FilesController.js

import fs from 'fs';
import mime from 'mime-types';
import { generateThumbnails } from 'image-thumbnail';
import { fileQueue } from '../utils/queue';

class FilesController {
  // ... existing code

  static async postUpload(req, res) {
    // ... existing code

    if (type === 'image') {
      fileQueue.add({ userId, fileId: file.id });
    }

    // ... existing code
  }

  // ... existing code

  static async getThumbnail(req, res) {
    // ... existing code

    if (file.type === 'image' && req.query.size) {
      const thumbnailPath = `/tmp/files_manager/${file.id}_${req.query.size}`;
      try {
        const thumbnailContent = await fs.promises.readFile(thumbnailPath);
        res.setHeader('Content-Type', mime.lookup(file.name));
        return res.status(200).send(thumbnailContent);
      } catch (error) {
        // If thumbnail doesn't exist, fall back to the original file
      }
    }

    // ... existing code
  }
}

export default FilesController;
