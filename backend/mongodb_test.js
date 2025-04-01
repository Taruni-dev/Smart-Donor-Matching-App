const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("blood_donation");
    const users = db.collection("users");

    const result = await users.find().toArray();
    console.log("Users:", result);
  } finally {
    await client.close();
  }
}

run().catch(console.error);
