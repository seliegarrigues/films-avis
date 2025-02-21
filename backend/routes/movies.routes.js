// routes/movies.routes.js

import express from "express";
import MoviesController from "../controllers/movies.controller.js";
import ReviewsController from "../controllers/reviews.controller.js";

const router = express.Router();

router.get("/", MoviesController.apiGetMovies);
router.get("/id/:id", MoviesController.apiGetMovieById);
router.get("/ratings", MoviesController.apiGetRatings);

router.post("/review", ReviewsController.apiPostReview);
router.put("/review", ReviewsController.apiUpdateReview);
router.delete("/review", ReviewsController.apiDeleteReview);

export default router;
