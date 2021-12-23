// test-setup.js
import mongoose from "mongoose"


//mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;
import config from '../config'


jest.setTimeout(1200000)

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    try {
      const collection = mongoose.connection.collections[collectionName];
      await collection.drop()
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if(!(error instanceof Error)) return; 
      if (error.message === "ns not found") return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes("a background operation is currently running")) return;
      console.log(error.message);
    }
  }
}

export const setup = {
  setupDB(databaseName?: string) {
    // Connect to Mongoose
    beforeAll(async () => {
      try {
        const url = config.mongodb_testing_url
        //const url = databaseName ? `mongodb://127.0.0.1/${databaseName}` : config.mongodb_testing_url;
        return await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
      } catch(err) {
        throw err
      }
    });

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections();
    });

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
      await mongoose.connection.close();
    });
  }
};
