import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const { products, favorites } = useAppContext();
  const navigate = useNavigate();

  const favoriteProducts = products.filter(product => favorites.includes(product.id) && product.state !== false);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Mis Productos Favoritos</h1>
      {favoriteProducts.length === 0 ? (
        <div className="text-center">
          <p>Aún no tienes productos marcados como favoritos.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Explorar productos
          </Button>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {favoriteProducts.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favorites;