import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/productsSlice';
import { SearchBar } from '../components/SearchBar';

const store = configureStore({
  reducer: {
    products: productsReducer
  }
});

describe('SearchBar', () => {
  it('updates search query on input change', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input).toHaveValue('test');
  });
});