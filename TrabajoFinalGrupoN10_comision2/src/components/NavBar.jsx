import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthenticationUserContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige al home después de cerrar sesión
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Navbar bg='light' expand='md'>
      <Container>
        <Navbar.Brand as={Link} to='/'>Mercadito mayorista</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-between'>

          <Nav className='gap-3'>
            <Nav.Link as={Link} to='/'>Lista de productos</Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to='/favorites'>Favoritos</Nav.Link>
                <Nav.Link as={Link} to='/form'>Agregar Producto</Nav.Link>
              </>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-3">
            {isAuthenticated ? (
              <>
                {/*<span className="text-muted small mb-0">Hola, {user.email}</span>*/}
                <span className="text-muted small mb-0">Hola,administrador</span>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button variant="outline-primary" size="sm" onClick={handleLogin}>
                Iniciar sesión
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;