import { IUserDto } from "../dtos/user.dto";
import * as dotenv from "dotenv";
import fetch from "node-fetch";
import { IPricedProductItem, IProductItem } from "../types/products";

dotenv.config();

const PRODUCTS_API = "https://dummyjson.com/products/";

export class ProductsService {
  static async getProducts(
    isPriced = false
  ): Promise<{ products: IProductItem[] } | IPricedProductItem[]> {
    const res = await fetch(`${PRODUCTS_API}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!isPriced) {
      return {
        products: [
          ...(data.products as IPricedProductItem[]).map(item => {
            item.price = 0;
            return item;
          }),
        ],
      };
    } else {
      return data;
    }
  }
}
