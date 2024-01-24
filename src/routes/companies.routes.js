import { Router } from "express";
import { getAllCompanies, getCompanyArticles } from "../controllers/comapnies.controller.js";
const router = Router();

router.route("/getallcompanies").get(getAllCompanies);
router.route("/:companyName").get(getCompanyArticles);

export default router;



