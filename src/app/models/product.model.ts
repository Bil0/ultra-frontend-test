export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface HomeProduct extends Product {
  isInBasket: boolean;
}
