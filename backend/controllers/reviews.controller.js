// controllers/reviews.controller.js

import ReviewsService from "../services/reviews.service.js";

export default class ReviewsController {
  static async createReview(req, res) {
    console.log("🔍 Données reçues :", req.body);
    try {
      const { movie_id, review, name, user_id } = req.body;

      if (!movie_id || !review || !name || !user_id) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
      }

      const userInfo = { name, _id: user_id };
      const date = new Date();

      await ReviewsService.addReview(movie_id, userInfo, review, date);
      res.status(201).json({ message: "Avis ajouté avec succès !" });
    } catch (error) {
      console.error("Erreur dans createReview:", error);
      res
        .status(500)
        .json({ error: "Erreur serveur lors de l'ajout de l'avis." });
    }
  }

  static async updateReview(req, res) {
    try {
      const { review_id, review, user_id } = req.body;

      if (!review_id || !review || !user_id) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
      }

      const date = new Date();
      const ReviewResponse = await ReviewsService.updateReview(
        review_id,
        user_id,
        review,
        date
      );

      if (ReviewResponse.error) {
        return res.status(404).json({ error: ReviewResponse.error });
      }

      if (ReviewResponse.modifiedCount === 0) {
        return res.json({ message: "Aucune modification apportée." });
      }

      res.json({ message: "Avis mis à jour avec succès !" });
    } catch (error) {
      console.error("Erreur dans updateReview:", error);
      res
        .status(500)
        .json({ error: "Erreur serveur lors de la mise à jour de l'avis." });
    }
  }

  static async deleteReview(req, res) {
    try {
      const { review_id, user_id } = req.body;

      if (!review_id || !user_id) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
      }

      const deleteResponse = await ReviewsService.deleteReview(
        review_id,
        user_id
      );

      if (deleteResponse.deletedCount === 0) {
        return res
          .status(404)
          .json({ error: "Aucun avis trouvé ou non autorisé." });
      }

      res.json({ message: "Avis supprimé avec succès !" });
    } catch (error) {
      console.error("Erreur dans deleteReview:", error);
      res
        .status(500)
        .json({ error: "Erreur serveur lors de la suppression de l'avis." });
    }
  }
}
