import express from "express";
import { rewriteAndSaveController } from "../controllers/updatedArticle.controller.js";

const router = express.Router();

router.post("/rewrite/", rewriteAndSaveController);

export default router;
