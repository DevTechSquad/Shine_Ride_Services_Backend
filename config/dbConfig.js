const { MongoClient } = require('mongodb');
require('dotenv').config();

//const uri = `mongodb+srv://devtechsquad:devtechsquad@cluster0.linj9eq.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(process.env.MONGO_URL);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

function getClient() {
  return client;
}

module.exports = { connect, getClient };
