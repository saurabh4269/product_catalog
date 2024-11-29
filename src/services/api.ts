import axios from 'axios';
import { Product } from '../types/product';

const API_URL = 'https://fakestoreapi.com';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};