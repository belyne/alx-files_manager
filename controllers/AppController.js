// controllers/AppController.js

class AppController {
  static getStatus(_, res) {
    return res.status(200).json({ redis: true, db: true });
  }

  static async getStats(_, res) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();
    return res.status(200).json({ users: usersCount, files: filesCount });
  }
}

export default AppController;
