import React from 'react';
import { ProductCard } from './ProductCard';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Loader } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { filteredItems, status, error, pagination, darkMode } = useSelector(
    (state: RootState) => state.products
  );

  const { currentPage, itemsPerPage } = pagination;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className={`text-center ${darkMode ? 'text-red-400' : 'text-red-500'}`}>
        Error: {error}
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {currentItems.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};