import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSortBy } from '../store/productsSlice';
import { SortOption } from '../types/product';

export const SortSelect: React.FC = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state: RootState) => state.products.sortBy);
  const darkMode = useSelector((state: RootState) => state.products.darkMode);

  return (
    <select
      value={sortBy}
      onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
      className={`rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
        darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900'
      }`}
    >
      <option value="title-asc">Name (A-Z)</option>
      <option value="price-asc">Price (Low to High)</option>
      <option value="price-desc">Price (High to Low)</option>
      <option value="rating-desc">Highest Rated</option>
    </select>
  );
};