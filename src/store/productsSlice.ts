import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, SortOption, PaginationState } from '../types/product';
import { getProducts } from '../services/api';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  searchQuery: string;
  sortBy: SortOption;
  pagination: PaginationState;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  darkMode: boolean;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  searchQuery: '',
  sortBy: 'title-asc',
  pagination: {
    currentPage: 1,
    itemsPerPage: 8,
    totalItems: 0,
  },
  status: 'idle',
  error: null,
  darkMode: false,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return await getProducts();
});

const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating.rate - a.rating.rate;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      const filtered = state.items.filter(product =>
        product.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.filteredItems = sortProducts(filtered, state.sortBy);
      state.pagination.currentPage = 1;
      state.pagination.totalItems = filtered.length;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      state.filteredItems = sortProducts(state.filteredItems, action.payload);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = sortProducts(action.payload, state.sortBy);
        state.pagination.totalItems = action.payload.length;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setSearchQuery, setSortBy, setCurrentPage, toggleDarkMode } = productsSlice.actions;
export default productsSlice.reducer;