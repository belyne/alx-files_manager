// controllers/FilesController.js

class FilesController {
  // ... existing code

  static async postUpload(req, res) {
    const { userId } = req.body;
    const { name, type, parentId } = req.file;
    if (!userId || !name || !type) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const file = await dbClient.createFile(name, type, parentId, userId);
    if (!file) {
      return res.status(400).json({ error: 'File could not be created' });
    }

    return res.status(201).json(file);
  }
}

export default FilesController;
