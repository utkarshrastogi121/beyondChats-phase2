import express from "express";
import {
  rewriteAndPublishController
} from "../controllers/publisher.controller.js";

const router = express.Router();

router.post("/rewrite-publish/", rewriteAndPublishController);

export default router;
