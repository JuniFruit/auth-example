import { api, APP_URL } from "@/api/axios.setup";
import { IPricedProductItem, IProductItem } from "@/types/product.types";
import axios, { AxiosResponse } from "axios";

export class ProductsService {
  // page 1 is for all users, other for authorized only
  static async getProducts(
    isPriced = false
  ): Promise<
    AxiosResponse<{ products: IProductItem[] | IPricedProductItem[] }>
  > {
    if (!isPriced)
      return axios.get<{ products: IProductItem[] }>(`${APP_URL}data/products`);
    return api.get<{ products: IPricedProductItem[] }>(
      `data/products?priced=${isPriced}`
    );
  }
}
