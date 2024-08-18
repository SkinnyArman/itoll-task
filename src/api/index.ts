// utils/api.ts

import { API_BASE_URL } from "@/utils/constants";
import { CartItem } from "@/types/CartItem";
import { messages } from "@/utils/messages";

enum Methods {
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
  Get = "GET",
}

enum ContentTypes {
  JSON = "application/json",
  FormUrlEncoded = "application/x-www-form-urlencoded",
  MultipartFormData = "multipart/form-data",
}

export const fetchCartItems = async (): Promise<CartItem[]> => {
  const response = await fetch(`${API_BASE_URL}/cart`);
  if (!response.ok) {
    throw new Error(messages.cart.fetchFailure);
  }
  return response.json();
};

export const updateCartItem = async (item: CartItem): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/cart/${item.id}`, {
    method: Methods.Put,
    headers: {
      "Content-Type": ContentTypes.JSON,
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error(messages.cart.updateFailure);
  }
};

export const addCartItem = async (item: CartItem): Promise<CartItem> => {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: Methods.Post,
    headers: {
      "Content-Type": ContentTypes.JSON,
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error(messages.cart.addFailure);
  }
  return response.json();
};

export const deleteCartItem = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/cart/${id}`, {
    method: Methods.Delete,
  });
  if (!response.ok) {
    throw new Error(messages.cart.deleteFailure);
  }
};

export const fetchProducts = async (options?: RequestInit): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    ...options,
  });
  if (!response.ok) {
    throw new Error(messages.products.fetchFailure);
  }
  return response.json();
};
