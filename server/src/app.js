import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import env from "./config/env.js";

import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

import reportRoutes from "./routes/report.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import authRoutes from "./routes/auth.routes.js";
import geminiRoutes from "./routes/test.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import adminRoutes from "./routes/admin.routes.js";
const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Healthy",
    timestamp: new Date(),
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/reports", reportRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(
  "/api/notifications",
  notificationRoutes
);
app.use(
  "/api/admin",
  adminRoutes
);


app.use(notFound);
app.use(errorHandler);

export default app;