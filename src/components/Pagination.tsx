import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setCurrentPage } from '../store/productsSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage, totalItems } = useSelector(
    (state: RootState) => state.products.pagination
  );
  const darkMode = useSelector((state: RootState) => state.products.darkMode);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md ${
          darkMode
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        } ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={`px-4 py-2 rounded-md ${
            currentPage === i + 1
              ? 'bg-blue-600 text-white'
              : darkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md ${
          darkMode
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        } ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};