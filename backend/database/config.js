const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("Base de datos online! xD");
  } catch (error) {
    console.log(error);
    throw new Error("Error de conexcion a DB");
  }
};

module.exports = {
  dbConnection,
};
