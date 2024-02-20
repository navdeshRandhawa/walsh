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
  category: string;
  outofStock: boolean;
  discountPercentage?: number;
}
