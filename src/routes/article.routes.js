import { Router } from "express";
import {
  getAllArticles,
  getArticleByTags,
  getSingleArticle,
  postArticle,
} from "../controllers/article.controller.js";
import {
  getAllRequest,
  requestArticle,
} from "../controllers/request.controller.js";

const router = Router();

router.route("/post").post(postArticle);
router.route("/tags").get(getArticleByTags);
router.route("/all").get(getAllArticles);

router.route("/request").post(requestArticle);
router.route("/request/all").get(getAllRequest);

router.route("/:articleId").get(getSingleArticle);

export default router;
