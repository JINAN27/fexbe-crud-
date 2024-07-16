const { MongoClient } = require('mongodb');

const uri = "mongodb://appuser:apppassword@127.0.0.1:27017/eduwork?authSource=admin";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = { connect };
