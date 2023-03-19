export interface IProductItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
}

export interface IPricedProductItem extends IProductItem {
  price: number;
}
