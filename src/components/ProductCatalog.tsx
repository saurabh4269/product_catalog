import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { fetchProducts } from '../store/productsSlice';
import { SearchBar } from './SearchBar';
import { ProductGrid } from './ProductGrid';
import { Pagination } from './Pagination';
import { SortSelect } from './SortSelect';

export const ProductCatalog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <SearchBar />
        <SortSelect />
      </div>
      <ProductGrid />
      <Pagination />
    </main>
  );
};