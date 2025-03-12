// backend/server.js
import "dotenv/config";
console.log("DB_URI:", process.env.DB_URI);

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import moviesRoutes from "./routes/movies.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import userRoutes from "./routes/user.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/reviews", reviewsRoutes);
app.use("/api/v1/users", userRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(` Serveur en cours d'exécution sur le port ${port}`);
});
