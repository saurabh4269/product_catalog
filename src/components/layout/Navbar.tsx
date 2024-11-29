import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';
import { ShoppingBag, LogOut } from 'lucide-react';
import { DarkModeToggle } from '../DarkModeToggle';

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const darkMode = useSelector((state: RootState) => state.products.darkMode);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <h1 className={`ml-2 text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Product Catalog
            </h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};