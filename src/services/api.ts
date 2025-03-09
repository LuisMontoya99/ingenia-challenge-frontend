import axios from "axios";
import { Product } from "../types/Product";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get("https://dummyjson.com/products");
  return response.data.products;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await axios.get(`https://dummyjson.com/products/${id}`);
  return response.data;
};
