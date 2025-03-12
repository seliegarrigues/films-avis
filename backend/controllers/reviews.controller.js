// controllers/reviews.controller.js

import ReviewsService from "../services/reviews.service.js";

export default class ReviewsController {
  static async createReview(req, res) {
    console.log("🔍 Données reçues :", req.body);
    try {
      const { movie_id, comment, name, user_id } = req.body;
      const date = new Date();

      const newReview = await ReviewsService.addReview(
        movie_id,
        { _id: user_id, name: name },
        comment,
        date
      );

      res.status(201).json(newReview);
    } catch (error) {
      console.error("Erreur dans createReview:", error);
      res
        .status(500)
        .json({ error: "Erreur serveur lors de l'ajout de l'avis." });
    }
  }

  static async updateReview(req, res) {
    try {
      const { reviewId } = req.params;
      const { comment } = req.body;
      const date = new Date();
      const updateReview = await ReviewsService.updateReview(
        reviewId,
        comment,
        date
      );

      if (updateReview.error) {
        return res.status(404).json({ updateReview: "erreur." });
      }

      res.status(200).json(updateReview);
    } catch (error) {
      console.error("Erreur dans updateReview:", error);
      res
        .status(500)
        .json({ error: "Erreur serveur lors de la mise à jour de l'avis." });
    }
  }

  static async deleteReview(req, res) {
    try {
      const { reviewId } = req.params;

      const result = await ReviewsService.deleteReview(reviewId);

      res.status(200).json(result);
    } catch (error) {
      console.error("Erreur dans deleteReview:", error);
      res
        .status(500)
        .json({ error: "Erreur  lors de la suppression de l'avis." });
    }
  }
}
