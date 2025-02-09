import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const { movie_id, review, name, user_id } = req.body;

      if (!movie_id || !review || !name || !user_id) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
      }

      const userInfo = { name, _id: user_id };
      const date = new Date();

      await ReviewsDAO.addReview(movie_id, userInfo, review, date);
      res.json({ status: "Ajout réussi" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const { review_id, review, user_id } = req.body;

      if (!review_id || !review || !user_id) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
      }

      const date = new Date();
      const ReviewResponse = await ReviewsDAO.updateReview(
        review_id,
        user_id,
        review,
        date
      );

      if (ReviewResponse.error) {
        return res.status(404).json({ error: ReviewResponse.error });
      }
      if (ReviewResponse.matchedCount === 0) {
        return res
          .status(404)
          .json({ error: "Aucun avis trouvé pour ce review_id et user_id" });
      }

      if (ReviewResponse.modifiedCount === 0) {
        return res.json({ status: "aucune modification apportée" });
      }

      res.json({ status: "Mise à jour réussie" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const { review_id, user_id } = req.body;

      if (!review_id || !user_id) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
      }

      await ReviewsDAO.deleteReview(review_id, user_id);
      res.json({ status: "Suppression réussie" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
