// backend/server.js
import "dotenv/config";
console.log("DB_URI:", process.env.DB_URI);

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import moviesRoutes from "./routes/movies.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/reviews", reviewsRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

app.use(errorHandler);

export default app;
