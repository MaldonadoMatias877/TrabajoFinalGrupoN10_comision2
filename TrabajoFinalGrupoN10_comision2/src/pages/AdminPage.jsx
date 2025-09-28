import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthenticationUserContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';
import productosData from '../data/productos.json';

export default function AdminPage() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const adminRegistrado = !!localStorage.getItem('adminUser');

  // Usar productos desde localStorage si existen, sino desde productosData
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : productosData;
  });

  useEffect(() => {
    if (adminRegistrado && !admin) {
      navigate('/admin/login');
    }
  }, [admin, adminRegistrado, navigate]);

  const handleDelete = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    setProducts(filtered);
    localStorage.setItem('products', JSON.stringify(filtered));
  };

  // Redirigir a la página de edición del producto
  const handleEditClick =(product) => {
    navigate(`/admin/editar/${product.id}`);
    console.log(product.id);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Panel de Administración</h1>

      {!adminRegistrado && (
        <div className="text-center">
          <p>No hay administrador registrado aún.</p>
          <Link to="/admin/registro">
            <button className="btn btn-primary">Registrar Administrador</button>
          </Link>
        </div>
      )}

      {admin && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Bienvenido, {admin.nombre}</h4>
            <button className="btn btn-danger" onClick={logout}>
              Cerrar sesión
            </button>
          </div>

          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.title}
                    style={{ height: '180px', objectFit: 'contain' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      <strong>Precio:</strong> ${product.price}
                    </Card.Text>

                    <div className="mt-auto d-flex justify-content-between">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEditClick(product)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}