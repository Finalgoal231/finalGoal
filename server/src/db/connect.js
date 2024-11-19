// external modules import
const { MongoClient, ServerApiVersion } = require('mongodb');

const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017/team231';

const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDatabase = async () => {
  try {
    await client
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Connected to MongoDB database successfully.');
      })
      .catch(error => {
        console.log('Error connecting to MongoDB: ', error.message);
      });
  } catch (error) {
    console.log('Database connection error: ', error.message);
  }
};

module.exports = connectDatabase;
