import { HomeProduct } from './product.model';

export interface Basket {
  products: HomeProduct[];
  total: number;
}
