require('dotenv').config();
const mongoose = require('mongoose');




async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
    });
    console.log('Connected to MongoDB',process.env.MONGO_URL);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

function getClient() {
  return client;
}

module.exports = { connect, getClient };
