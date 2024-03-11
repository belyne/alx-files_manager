// tests/dbClient.test.js
import dbClient from '../utils/db';
import { clearDatabase } from './testUtils';

describe('dbClient', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await dbClient.close();
  });

  it('should insert and retrieve data from the database', async () => {
    const collectionName = 'testCollection';
    const document = { key: 'value' };

    const result = await dbClient.db.collection(collectionName).insertOne(document);
    expect(result.insertedCount).toBe(1);

    const insertedDocument = await dbClient.db.collection(collectionName).findOne({ _id: result.insertedId });
    expect(insertedDocument.key).toBe(document.key);
  });
});
