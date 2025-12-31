import express from "express";
import {
  rewriteAndPublishController,
  getUpdatedArticlesController,
} from "../controllers/publisher.controller.js";

const router = express.Router();

router.post("/rewrite-publish/", rewriteAndPublishController);
router.get("/updated-articles", getUpdatedArticlesController);

export default router;
