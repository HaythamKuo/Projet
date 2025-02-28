import mongoose from "mongoose";

const env = process.env.NODE_ENV || "development";
let mongoUri = "";

if (env === "production") {
  mongoUri = process.env.MONGODB_URI_PROD;
} else {
  mongoUri = process.env.MONGODB_URI_DEV;
}

// mongoose.connection.once("open", () => {
//   console.log(`正在連接${env}的資料庫`);
// });
// mongoose.connection.on("error", (error) => {
//   console.error(error);
// });

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
