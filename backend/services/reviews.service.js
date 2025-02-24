// services/reviews.service.js

import { ObjectId } from "bson";
import { getDB } from "../config/db.js";

export default class ReviewsService {
  // Ajouter un avis
  static async addReview(movieId, user, review, date) {
    try {
      const db = getDB();
      console.log(" Connexion à la base MongoDB réussie !");
      console.log(" Données envoyées :", { movieId, user, review, date });
      const reviewDoc = {
        movie_id: new ObjectId(movieId),
        user: user,
        review: review,
        date: date,
      };

      const result = await db.collection("reviews").insertOne(reviewDoc);
      return result;
    } catch (error) {
      console.error(" Erreur lors de l'ajout de l'avis :", error);
      throw new Error("Impossible d'ajouter l'avis.");
    }
  }

  // Modifier un avis
  static async updateReview(reviewId, userId, review, date) {
    try {
      const db = getDB();
      const updateResult = await db
        .collection("reviews")
        .updateOne(
          { _id: new ObjectId(reviewId), "user._id": userId },
          { $set: { review: review, date: date } }
        );

      if (updateResult.matchedCount === 0) {
        return { error: "Aucun avis trouvé ou non autorisé." };
      }

      return updateResult;
    } catch (error) {
      console.error(" Erreur lors de la mise à jour de l'avis :", error);
      throw new Error("Impossible de mettre à jour l'avis.");
    }
  }

  // Supprimer un avis
  static async deleteReview(reviewId, userId) {
    try {
      const db = getDB();
      const deleteResult = await db.collection("reviews").deleteOne({
        _id: new ObjectId(reviewId),
        "user._id": userId,
      });

      return deleteResult;
    } catch (error) {
      console.error(" Erreur lors de la suppression de l'avis :", error);
      throw new Error("Impossible de supprimer l'avis.");
    }
  }
}
