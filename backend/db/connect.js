const mongoose = require("mongoose");

const connectDB = async ({url}) => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("Database connection is active and listening");
  } catch (error) {
    console.log("Failed to connect to database", error);
  }
};
module.exports = connectDB;

