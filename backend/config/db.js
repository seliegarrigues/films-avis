// config/db.js
import mongoose from "mongoose";
import Movie from "../models/Movie.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.DB_URI + process.env.DB_NAME
    );
    const count = await Movie.countDocuments();
    console.log(count);
    console.log(`projet connecté à Mongoose: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erreur de connexion à MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
