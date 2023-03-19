import express from "express";
import { UserController } from "../controllers/user.controller";
import { emailValid, passwordValid, validate } from "../validation/general";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/activation/:link", UserController.activate);

router.post("/login", UserController.login);
router.post(
  "/registration",
  validate([passwordValid, emailValid]),
  UserController.create
);
router.get("/refresh", UserController.refresh);

router.get("/users", authMiddleware, UserController.getAllUsers);
router.post("/logout", authMiddleware, UserController.logout);
router.post("/resend_mail", authMiddleware, UserController.resendMail);

export default router;
