const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017/pawsandhearts";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db("pawsandhearts");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
}

module.exports = { connectToDatabase };