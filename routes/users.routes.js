import {Router} from 'express'
import { signupaction } from '../controllers/signup.controller.js';
import { otpVerify } from '../controllers/verifyOTP.controller.js';
const router = Router();

router.route("/signup").post(signupaction);
router.route("/verifyOTP").post(otpVerify)
export default router;