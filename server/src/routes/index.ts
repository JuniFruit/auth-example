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

router.use(authMiddleware);

router.get("/users", UserController.getAllUsers);
router.post("/logout", UserController.logout);

export default router;
