import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { MONGO_URI } from "../config/index.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGO_URI}/${DB_NAME}`
    );

    console.log(
      `Mongo DB Connection !! DB Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDb Connection Error", error);
    process.exit(1);
  }
};

export default connectDB;

