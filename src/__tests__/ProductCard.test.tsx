import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/productsSlice';
import { ProductCard } from '../components/ProductCard';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: 'test',
  image: 'test.jpg',
  rating: {
    rate: 4.5,
    count: 100
  }
};

const store = configureStore({
  reducer: {
    products: productsReducer
  }
});

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('(100 reviews)')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
  });
});