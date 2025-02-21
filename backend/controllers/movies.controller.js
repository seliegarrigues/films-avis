// controllers/movies.controller.js

import MoviesService from "../services/movies.service.js";

export default class MoviesController {
  static async getMovies(req, res) {
    try {
      const moviesPerPage = parseInt(req.query.moviesPerPage) || 20;
      const page = parseInt(req.query.page) || 0;

      const filters = {};
      if (req.query.rated) filters.rated = req.query.rated;
      if (req.query.title) filters.title = req.query.title;

      const { movies, totalNumMovies } = await MoviesService.getMovies({
        filters,
        page,
        moviesPerPage,
      });

      res.status(200).json({
        movies,
        page,
        filters,
        entries_per_page: moviesPerPage,
        total_results: totalNumMovies,
      });
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
