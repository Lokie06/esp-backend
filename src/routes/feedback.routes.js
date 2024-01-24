import { Router } from "express";
import { getFeedbacks, postFeedback } from "../controllers/feedback.controller.js";

const router = Router();

router.route('/').post(postFeedback).get(getFeedbacks);
// router.route('/').get(getFeedbacks);


export default router;