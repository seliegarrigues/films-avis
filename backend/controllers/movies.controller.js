// controllers/movies.controller.js

import MoviesService from "../services/movies.service.js";
class MoviesController {
  static async getMovies(req, res) {
    try {
      const movies = await MoviesService.getMovies();
      res.status(200).json(movies);
    } catch (error) {
      console.error("Erreur dans getMovies :", error);
      res.status(500).json({
        message: "Erreur serveur lors de la récupération des films",
        error: error.message,
      });
    }
  }

  static async getMovieById(req, res) {
    try {
      const { id } = req.params;
      console.log("ID reçu dans le controller:", id, "Type", typeof id);

      const movie = await MoviesService.getMovieById(id);

      if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
      }

      res.status(200).json(movie);
    } catch (error) {
      console.error("Erreur dans getMovieById :", error);
      res.status(500).json({
        message: "Erreur serveur lors de la récupération du film",
        error: error.message,
      });
    }
  }

  static async getRatings(req, res) {
    try {
      const ratings = await MoviesService.getRatings();
      res.status(200).json(ratings);
    } catch (error) {
      console.error("Erreur dans getRatings :", error);
      res.status(500).json({
        message: "Erreur serveur lors de la récupération des notations",
        error: error.message,
      });
    }
  }
}
export default MoviesController;
