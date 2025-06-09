import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [idProduct, setIdProduct] = useState(1);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: idProduct,
      state: true,
    };
    setProducts([...products, newProduct]);
    setIdProduct(idProduct + 1);
  };

  const deleteProduct = (id) => {
    setProducts(products.map((p) =>
      p.id === id ? { ...p, state: false } : p
    ));
  };

  const restoreProduct = (id) => {
    setProducts(products.map((p) =>
      p.id === id ? { ...p, state: true } : p
    ));
  };

  const editingProduct = (productoEditado) => {
    setProducts(products.map((p) =>
      p.id === productoEditado.id ? { ...productoEditado } : p
    ));
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        restoreProduct,
        editingProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
