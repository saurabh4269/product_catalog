import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleDarkMode } from '../store/productsSlice';

export const DarkModeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.products.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className={`p-2 rounded-md ${
        darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'
      }`}
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};