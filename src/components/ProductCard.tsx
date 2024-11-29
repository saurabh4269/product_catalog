import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '../types/product';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const darkMode = useSelector((state: RootState) => state.products.darkMode);

  return (
    <div className={`${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}>
      <div className="relative pt-[100%]">
        <img
          src={product.image}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {product.title}
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating.rate)
                    ? 'text-yellow-400 fill-current'
                    : darkMode ? 'text-gray-600' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className={`ml-2 text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            ({product.rating.count} reviews)
          </span>
        </div>
        <p className="text-xl font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};