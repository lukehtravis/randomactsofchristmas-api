const { connectToDb } = require('./dbConnect');

async function addAct(actData) {
  try {
    const db = await connectToDb();
    const collection = await db.collection("acts");
    const result = await collection.insertOne(actData);
    return result;
  } catch (error) {
    console.error(`Error inserting act data into acts:`, error);
    throw error;
  }
}

module.exports = addAct;