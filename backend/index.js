import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const server = http.createServer(app);

const port = process.env.PORT || 5001;

async function startServer() {
  await connectDB();
  await server.listen(port, console.log(`正在聆聽${port}`));
}

startServer();
