import React from 'react';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/productsSlice';
import { RootState } from '../store/store';

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.products.searchQuery);
  const darkMode = useSelector((state: RootState) => state.products.darkMode);

  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          darkMode
            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        }`}
        placeholder="Search products..."
      />
    </div>
  );
};