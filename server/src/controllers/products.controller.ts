import { RequestHandler } from "express";
import { ProductsService } from "../service/products.service";

export class ProductsController {
  static getProducts: RequestHandler = async (req, res, next) => {
    try {
      const result = await ProductsService.getProducts(
        req.query.priced === "true"
      );
      res.json(result);
    } catch (error: any) {
      next(error);
    }
  };
}
