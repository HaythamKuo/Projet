import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const mongoUri =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV;
// const mongoUri =
//   process.env.NODE_ENV === "production"
//     ? process.env.MONGODB_URI_DEV
//     : process.env.MONGODB_URI_PROD;

if (!mongoUri) {
  throw new Error(`MongoDB URI is undefined! Please set MONGODB_URI_`);
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`資料庫連接： ${process.env.NODE_ENV}環境`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export { connectDB };
