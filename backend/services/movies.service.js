// services/movies.service.js
import mongoose from "mongoose";
import Movie from "../models/Movie.js";
class MoviesService {
  static async getMovies() {
    try {
      const movies = await Movie.find({}).limit(10);
      console.log(movies);
      return movies;
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error);
      throw error;
    }
  }

  static async getRatings() {
    try {
      const ratings = await Movie.distinct("rated");
      return ratings;
    } catch (error) {
      console.error("Erreur lors de la récupération des notes :", error);
      return [];
    }
  }

  static async getMovieById(id) {
    try {
      console.log("ID reçu dans le service :", "type:", typeof id, id);

      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("ID invalide :", id);
        return null;
      }

      const movie = await Movie.findById(id);
      console.log(movie);

      if (!movie) {
        console.log("Aucun film trouvé avec cet ID dans MongoDB.");
      } else {
        console.log("Film trouvé :", movie);
      }

      return movie;
    } catch (error) {
      console.error("Erreur lors de la récupération du film par ID :", error);
      return null;
    }
  }
}
export default MoviesService;
