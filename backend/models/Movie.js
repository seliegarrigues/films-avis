import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: String, required: true },
    rated: { type: String },
    genres: [{ type: String }],
    plot: { type: String },
    poster: { type: String },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema, "movies");
export default Movie;
