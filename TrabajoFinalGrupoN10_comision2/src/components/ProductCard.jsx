import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  const { toggleFavorite, favorites, deleteProduct } = useAppContext();

  const isFavorite = favorites.includes(product.id);

  const handleDetailsClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
      deleteProduct(product.id);
    }
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation(); 
    toggleFavorite(product.id);
  };

  return (
    <Card className="h-100 shadow-sm" style={{ cursor: 'pointer' }}>
      {product.preview && (
        <Card.Img
          variant="top"
          src={product.preview}
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center">{product.name}</Card.Title>
        <Card.Text>
          <strong>Precio:</strong> ${parseFloat(product.price).toFixed(2)}
        </Card.Text>
        <Card.Text>
          <strong>Categoría:</strong> {product.category}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Button variant="primary" size="sm" onClick={handleDetailsClick}>
            Ver detalles
          </Button>
          
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteClick}
          >
            Eliminar
          </Button>
          
          <Button
            variant="link" 
            onClick={handleToggleFavorite}
            className="p-0" 
            style={{ color: isFavorite ? 'red' : 'grey', fontSize: '1.5rem' }}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;