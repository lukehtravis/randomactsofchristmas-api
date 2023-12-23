const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@randomactsofchristmas.fmtgilq.mongodb.net/randomactsofchristmas?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDb() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    db = await client.connect();
    console.log("Connection to database made successfully")
    return client.db();
  } catch (error) {
    throw new Error(error)
  }
}

async function closeDB() {
  if (client) {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});

module.exports = {
  connectToDb,
  closeDB
};
