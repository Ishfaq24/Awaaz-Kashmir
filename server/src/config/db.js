import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);

    console.log(`
===================================
 MongoDB Connected
 Host : ${conn.connection.host}
 Database : ${conn.connection.name}
===================================
`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;