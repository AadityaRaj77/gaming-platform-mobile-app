import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import meRoutes from "./routes/me.routes";
import { initSocket } from "./socket";


const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/api", meRoutes);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

const httpServer = createServer(app);
initSocket(httpServer);
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

const PORT = Number(process.env.PORT) || 4000;

httpServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
