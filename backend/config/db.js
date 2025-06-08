import mongoose from "mongoose";

const env = process.env.NODE_ENV || "development";
let mongoUri = "";

if (env === "production") {
  mongoUri = process.env.MONGODB_URI_PROD;
} else {
  mongoUri = process.env.MONGODB_URI_DEV;
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`資料庫連接： ${env}環境`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export { connectDB };
