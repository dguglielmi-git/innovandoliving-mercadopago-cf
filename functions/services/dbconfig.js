const mongoose = require("mongoose");
const {
  DB_CONNECTION_SUCCESSFULLY,
  ERROR_CONNECTING_DB,
} = require("../utils/constants");

const connectToDatabase = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(DB_CONNECTION_SUCCESSFULLY);
  } catch (error) {
    console.log(error);
    throw new Error(`${ERROR_CONNECTING_DB} ${error}`);
  }
};

module.exports = {
  connectToDatabase,
};
