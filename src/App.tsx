import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { ProductCatalog } from './components/ProductCatalog';
import { Navbar } from './components/layout/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

function App() {
  const darkMode = useSelector((state: RootState) => state.products.darkMode);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: darkMode ? '#374151' : '#ffffff',
              color: darkMode ? '#ffffff' : '#000000',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;