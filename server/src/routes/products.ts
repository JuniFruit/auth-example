import express from "express";
import { ProductsController } from "../controllers/products.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/products",
  (req, res, next) =>
    req.query.priced === "true" ? authMiddleware(req, res, next) : next(),
  ProductsController.getProducts
);

export default router;
