import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  
  const { products, deleteProduct, restoreProduct, favorites, toggleFavorite } = useAppContext();
  const navigate = useNavigate();

  const product = products.find(p => p.id === parseInt(id));

  const isFavorite = product ? favorites.includes(product.id) : false;

  if (!product) {
    return (
      <Container className="my-5">
        <h2 className="text-center text-danger">Producto no encontrado.</h2>
        <div className="text-center mt-3">
          <Button variant="secondary" onClick={() => navigate('/')}>Volver a la lista de productos</Button>
        </div>
      </Container>
    );
  }

  const isProductActive = product.state !== false;

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0">
            {product.preview && (
              <Card.Img
                variant="top"
                src={product.preview}
                alt={product.name}
                style={{ maxHeight: '350px', objectFit: 'cover' }}
              />
            )}
            <Card.Body>
              <Card.Title className="text-center h3 mb-3">
                {product.name}
                {/* Ícono de corazón en el título de la tarjeta de detalles */}
                <Button
                  variant="link"
                  onClick={handleToggleFavorite}
                  className="p-0 ms-2" // Pequeño margen a la izquierda
                  style={{ color: isFavorite ? 'red' : 'grey', fontSize: '1.5rem', verticalAlign: 'middle' }}
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </Button>
              </Card.Title>
              <Card.Text>
                <strong>Precio:</strong> ${parseFloat(product.price).toFixed(2)}<br />
                <strong>Categoría:</strong> {product.category}<br />
                <strong>Stock:</strong> {product.stock || 'N/A'}<br />
                {product.dateInit && <strong>Fecha de ingreso:</strong>} {product.dateInit}<br />
                <strong>Descripción:</strong> {product.description}
              </Card.Text>
              <div className="d-grid gap-2">

                <Button variant="info" onClick={() => navigate(`/form?id=${product.id}`)}>
                  Editar producto
                </Button>

                
                <Button variant="secondary" onClick={() => navigate('/')}>
                  Volver a la lista
                </Button>

                
                {isProductActive ? (
                  <Button variant="danger" onClick={() => {
                    if (window.confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
                      deleteProduct(product.id);
                      navigate('/'); // Redirigir a la lista de productos después de eliminar
                    }
                  }}>
                    Eliminar producto
                  </Button>
                ) : (
                  <>
                    <p className="text-danger text-center">Este producto está inactivo.</p>
                    <Button variant="success" onClick={() => restoreProduct(product.id)}>
                      Restaurar producto
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;