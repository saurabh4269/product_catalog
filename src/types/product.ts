export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'title-asc';

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}