import cors from "cors";
import express from "express";
import { usersController } from "./controllers/usersController.js";
import { createServer } from "node:http";
import { initPrisma } from "./db/prisma.js";

const port = process.env.PORT || "3000";

export const allowedOrigins = [
  "http://localhost:5173",
  "https://user-dashboard-main.netlify.app" // the client in pro
];

const app = express();
const server = createServer(app);
app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

await initPrisma();

usersController(app);

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
