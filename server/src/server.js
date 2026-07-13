import http from "http";

import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";
import { initSocket } from "./socket.js";

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    initSocket(server);

    server.listen(env.PORT, () => {
      console.log(`
====================================
 Awaaz Kashmir Backend
 Running on Port ${env.PORT}
====================================
`);
    });
  } catch (error) {
    console.error("Server Error:", error);
    process.exit(1);
  }
};

startServer();