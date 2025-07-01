import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  // Iniciamos idProduct con un valor que asumimos que no colisionará inmediatamente
  // pero lo ajustaremos después de cargar los productos de la API.
  const [idProduct, setIdProduct] = useState(1); 

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al obtener productos');
        }
        return res.json();
      })
      .then(data => {
        // Mapea los productos de la API para que tengan la misma estructura
        const mappedProducts = data.map(apiProduct => ({
          id: apiProduct.id,
          name: apiProduct.title, // Mapea 'title' de la API a 'name'
          price: apiProduct.price,
          category: apiProduct.category,
          stock: apiProduct.rating ? apiProduct.rating.count : 0, // Usa rating.count o 0 si no existe
          dateInit: new Date().toISOString().split('T')[0], // Asigna la fecha actual
          description: apiProduct.description,
          preview: apiProduct.image, // Mapea 'image' de la API a 'preview'
          state: true, // Asumimos que los productos de la API están activos por defecto
        }));
        setProducts(mappedProducts);

        // Encuentra el ID más alto entre los productos de la API y usa el siguiente para los nuevos productos
        const maxApiId = mappedProducts.length > 0 ? Math.max(...mappedProducts.map(p => p.id)) : 0;
        setIdProduct(maxApiId + 1); // Establece el siguiente ID disponible
      })
      .catch(error => {
        console.error('Error al cargar productos:', error.message);
      });
  }, []); // El array de dependencias vacío asegura que se ejecuta solo una vez al montar

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: idProduct, // Asigna el ID único
      state: true,
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
    setIdProduct(prevId => prevId + 1); // Incrementa el contador para el próximo producto
  };

  const deleteProduct = (id) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, state: false } : product
      )
    );
    // Asegurarse de eliminarlo de favoritos si está eliminado
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
        // Al editar, se debe mantener el estado original (activo/inactivo) del producto
        product.id === productoEditado.id ? { ...productoEditado, state: product.state } : product
      )
    );
  };

  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(productId)) {
        // Si ya está en favoritos, lo quita
        return prevFavorites.filter(id => id !== productId);
      } else {
        // Si no está, lo agrega
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