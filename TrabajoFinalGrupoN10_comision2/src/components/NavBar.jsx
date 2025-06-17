import React from 'react';
<<<<<<< HEAD
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
=======
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthenticationUserContext';
>>>>>>> main

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
<<<<<<< HEAD
            {/* El enlace a /productDetails no es directo, se navega desde las tarjetas */}
            {/* <Nav.Link as={Link} to='/productDetails'>Ver más detalles</Nav.Link> */}
            <Nav.Link as={Link} to='/favorites'>Favoritos</Nav.Link>
            <Nav.Link as={Link} to='/form'>Agregar Producto</Nav.Link>
=======
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to='/favorites'>Favoritos</Nav.Link>
                <Nav.Link as={Link} to='/form'>Agregar Producto</Nav.Link>
              </>
            )}
>>>>>>> main
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