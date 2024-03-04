import { Router } from "express";
import { sendConfirmation, sendDecline , mailReceived} from "../controllers/mail.controller.js";
const router = Router();

router.route("/send-acceptance").post(sendConfirmation);
router.route("/send-decline").post(sendDecline);

router.route('/verify-me').post(mailReceived)

export default router;
