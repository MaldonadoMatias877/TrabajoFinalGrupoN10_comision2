// src/context/AppContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Aquí se inicializa como array vacío
  const [idProduct, setIdProduct] = useState(1);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: idProduct,
      state: true,
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
    setIdProduct(prevId => prevId + 1);
  };

  const deleteProduct = (id) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, state: false } : product
      )
    );
    setFavorites(prevFavorites => prevFavorites.filter(favId => favId !== id));
  };

  const restoreProduct = (id) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, state: true } : product
      )
    );
  };

  const editingProduct = (productoEditado) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productoEditado.id ? { ...productoEditado, state: product.state } : product
      )
    );
  };

  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter(id => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  };


  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        restoreProduct,
        editingProduct,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};