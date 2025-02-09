//dao/reviewsDAO.js

import { ObjectId } from "mongodb";

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("reviews");
    } catch (err) {
      console.error(
        `Désolé, nous n'avons pas réussi à établir la connection avec reviewDAO: ${err}`
      );
    }
  }
  static async addReview(movieId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        review: review,
        movie_id: new ObjectId(movieId),
        date: date,
      };
      return await reviews.insertOne(reviewDoc);
    } catch (err) {
      console.error(
        `Désolé, il n'est pas possible de créer cette tache:${err}`
      );
      return { error: err };
    }
  }
  static async updateReview(reviewId, userId, review, date) {
    try {
      const updateResponse = await reviews.updateOne(
        {
          user_id: userId,
          _id: new ObjectId(reviewId),
        },
        { $set: { review: review, date: date } }
      );
      return updateResponse;
    } catch (err) {
      console.error(
        `Désolé, il n'est pas possible d'effectuer la mise à jour :${err}`
      );
      return { error: err };
    }
  }
  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (err) {
      console.error(`Désolé, la suppression n'a pas été possible :${err}`);
    }
  }
}
