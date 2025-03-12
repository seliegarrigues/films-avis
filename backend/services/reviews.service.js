// services/reviews.service.js

import Review from "../models/Review.js";

export default class ReviewsService {
  static async addReview(movie_id, user, comment, date) {
    try {
      console.log(" Données envoyées :", { movie_id, user, comment, date });
      console.log(" Vérification avant création de l'avis :", {
        movie_id,
        user,
        comment,
        date,
      });

      const newReview = new Review({
        movie_id: movie_id,
        user: {
          _id: user?._id || "ID MANQUAN?", //  Assure que user contient un ID et un nom
          name: user?.name || "NOM MANQUANT",
        },
        comment: comment,
        date: date,
      });

      const result = await newReview.save();
      return result;
    } catch (error) {
      console.error(" Erreur lors de l'ajout de l'avis :", error);
      throw new Error("Impossible d'ajouter l'avis.");
    }
  }

  static async updateReview(reviewId, comment, date) {
    try {
      /*
      const updateResult = await Review.findOneAndUpdate(
        { _id: reviewId, "user._id": userId },
        { comment: comment, date: date },
        { new: true }
      );
      */
      const updateResult = await Review.findByIdAndUpdate(
        reviewId,
        {
          comment: comment,
          updatedAt: date,
        },
        { new: true }
      );
      if (!updateResult) {
        return { error: "Aucun avis trouvé ou non autorisé." };
      }

      return updateResult;
    } catch (error) {
      console.error(" Erreur lors de la mise à jour de l'avis :", error);
      throw new Error("Impossible de mettre à jour l'avis.");
    }
  }

  static async deleteReview(reviewId) {
    try {
      /*
      const deleteResult = await Review.deleteOne({
        _id: reviewId,
        "user._id": userId,
      });
      */
      const deleteResult = await Review.findByIdAndDelete(reviewId);
      return deleteResult;
    } catch (error) {
      console.error(" Erreur lors de la suppression de l'avis :", error);
      throw new Error("Impossible de supprimer l'avis.");
    }
  }
}
