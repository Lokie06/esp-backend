import { Router } from "express";
import { sendConfirmation, sendDecline } from "../controllers/mail.controller.js";
const router = Router();

router.route("/send-acceptance").post(sendConfirmation);
router.route("/send-decline").post(sendDecline);

export default router;
