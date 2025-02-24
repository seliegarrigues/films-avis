import express from "express";
import reviewsController from "../controllers/reviews.controller.js";

const router = express.Router();

router.post("/", reviewsController.createReview);
router.put("/:id", reviewsController.updateReview);
router.delete("/:id", reviewsController.deleteReview);
router.get("/", (req, res) => {
  res.json({ message: "Route GET /api/v1/reviews fonctionne !" });
});

export default router;
