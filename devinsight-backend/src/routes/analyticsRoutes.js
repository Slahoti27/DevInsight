import express from "express";
import { getRepos, getOverview } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/repos", getRepos);
router.get("/overview", getOverview);

export default router;