// services/movies.service.js
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

export default class MoviesService {
  static async getMovies({ filters = {}, page = 0, moviesPerPage = 20 } = {}) {
    try {
      const db = getDB();
      const query = {};

      if (filters.title) {
        query.$text = { $search: filters.title };
      } else if (filters.rated) {
        query.rated = filters.rated;
      }

      const movies = await db
        .collection("movies")
        .find(query)
        .skip(moviesPerPage * page)
        .limit(moviesPerPage)
        .toArray();

      const totalNumMovies = await db
        .collection("movies")
        .countDocuments(query);

      return { movies, totalNumMovies };
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error);
      return { movies: [], totalNumMovies: 0 };
    }
  }

  static async getRatings() {
    try {
      const db = getDB();
      return await db.collection("movies").distinct("rated");
    } catch (error) {
      console.error("Erreur lors de la récupération des notes :", error);
      return [];
    }
  }

  static async getMovieById(id) {
    try {
      console.log("ID reçu dans le service :", "type:", typeof id, id);
      const db = getDB();

      if (!ObjectId.isValid(id)) {
        console.error("ID invalide :", id);
        return null;
      }

      const objectId = new ObjectId(id);
      console.log("ObjectId converti :", objectId);

      const movie = await db
        .collection("movies")
        .aggregate([
          { $match: { _id: objectId } },
          {
            $lookup: {
              from: "reviews",
              localField: "_id",
              foreignField: "movie_id",
              as: "reviews",
            },
          },
        ])
        .next();

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
