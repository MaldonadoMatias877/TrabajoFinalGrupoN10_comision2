import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthenticationUserContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/registro');
  }

  return (
    <>
      {/* Primer nivel: solo el nombre del sitio */}
      <Navbar bg='light' className='border-bottom'>
        <Container className='justify-content-center'>
          <Navbar.Brand as={Link} to='/' className='fs-1 fw-bold'>
            Mercadito mayorista
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Segundo nivel: navegación y login */}
      <Navbar bg='light' expand='md'>
        <Container>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className='justify-content-between'>

            <Nav className='gap-3'>
              <Nav.Link as={Link} to='/' className='fs-4'>Lista de productos</Nav.Link>
              {isAuthenticated && (
                <>
                  <Nav.Link as={Link} to='/favorites' className='fs-4'>Favoritos</Nav.Link>
                  <Nav.Link as={Link} to='/form' className='fs-4'>Agregar Producto</Nav.Link>
                </>
              )}
            </Nav>

            <div className="d-flex align-items-center gap-3">
              {isAuthenticated ? (
                <>
                  <span className="text-muted small mb-0 fs-4">Hola, administrador</span>
                  <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline-primary" size="sm" onClick={handleLogin}>
                    Iniciar sesión
                  </Button>
                  <Button variant='outline-primary' size='sm' onClick={handleRegister}>
                    Registrarse
                  </Button>
                </>
                
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;