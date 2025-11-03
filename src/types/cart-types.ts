export interface Product {
  _id: string;
  image: string;
  title: string;
  description?: string;
  category?: string;
  brand?: string;
  price: number;
  saleprice?: number;
  totalstock?: number;
}

export interface CartItem {
  _id: string;
  userId: string;
  productId: Product;
  quantity: number;
}

export interface CartResponse {
  _id: string;
  userId: string;
  items: CartItem[];
  totalPrice?: number;
}

export interface CartState {
  cartItems: CartResponse | null;
  isLoading: boolean;
  error?: string | null;
}
