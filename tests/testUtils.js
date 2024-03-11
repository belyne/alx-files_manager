// tests/testUtils.js
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const clearDatabase = async () => {
  await dbClient.db.collection('users').deleteMany({});
  await dbClient.db.collection('files').deleteMany({});
};

const clearCache = async () => {
  await redisClient.del('users');
};

export { clearDatabase, clearCache };
