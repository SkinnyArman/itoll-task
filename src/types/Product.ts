export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  detailedDescription: string;
  hasDiscount: boolean;
  image: string;
  discountedPrice?: number;
  isBestSeller: boolean;
}
