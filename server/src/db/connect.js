// external modules import
const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/team231';

const connectDatabase = async () => {
  try {
    await mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true, // for mongoose 6.x
        // useFindAndModify: false, // for mongoose 6.x
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
