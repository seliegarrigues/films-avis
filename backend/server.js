// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import moviesRoutes from "./routes/movies.routes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/movies", moviesRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

app.use(errorHandler);

export default app;
