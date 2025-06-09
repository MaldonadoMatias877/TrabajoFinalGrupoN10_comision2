import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Table, Image } from 'react-bootstrap';

const DetailsProducts = () => {
  const { products } = useAppContext();

  const activeProducts = products.filter(p => p.state !== false); 

  return (
    <div>
      <h2>Detalle de productos</h2>
      {activeProducts.length === 0 ? (
        <p className="text-muted">No hay productos disponibles.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Fecha de ingreso</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {activeProducts.map(product => (
              <tr key={product.id}>
                <td>
                  {product.preview ? (
                    <Image
                      src={product.preview}
                      alt={product.name}
                      thumbnail
                      style={{ maxHeight: '100px', objectFit: 'cover' }}
                    />
                  ) : (
                    <span className="text-muted">Sin imagen</span>
                  )}
                </td>
                <td>{product.name}</td>
                <td>${parseFloat(product.price).toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>{product.dateInit}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default DetailsProducts;