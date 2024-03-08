import { Router } from "express";
import {
  getUnverifiedArticles,
  getVerifiedArticles,
  verifyArticle,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/get-unverified-articles").get(getUnverifiedArticles);
router.route("/get-verified-articles").get(getVerifiedArticles);
router.route("/verify-article/:id").put(verifyArticle);

export default router;
