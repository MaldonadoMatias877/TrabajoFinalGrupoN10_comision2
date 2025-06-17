import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Row, Col, Container } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { products } = useAppContext(); // Ya no necesitas deleteProduct directamente aquí

  const activeProducts = products.filter(p => p.state !== false);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Lista de Productos Disponibles</h1>

      {activeProducts.length === 0 ? (
        <p className="text-muted text-center">No hay productos disponibles.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {activeProducts.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default HomePage;