export interface Product {
  productId: number;
  imageUrl: string;
  name: string;
  description: string;
  like: boolean;
  likes: number;
  detailedDescription: string;
  price: number;
  isNewProduct: boolean;
  category: number;
  outofStock: boolean;
}
