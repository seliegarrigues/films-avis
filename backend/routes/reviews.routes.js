import express from "express";
import reviewsController from "../controllers/reviews.controller.js";

const router = express.Router();

router.post("/", reviewsController.createReview);
router.patch("/:reviewId", reviewsController.updateReview);
router.delete("/:reviewId", reviewsController.deleteReview);
router.get("/", (req, res) => {
  res.json({ message: "Route GET /api/v1/reviews fonctionne !" });
});

export default router;
