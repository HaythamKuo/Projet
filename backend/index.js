import http from "http";
import app from "./app.js";

// 設定應用

const server = http.createServer(app);

const port = process.env.PORT || 5001;

async function startServer() {
  await server.listen(port, console.log(`正在聆聽${port}`));
}

startServer();
