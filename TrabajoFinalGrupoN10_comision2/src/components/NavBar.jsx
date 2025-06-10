// src/components/NavBar.jsx
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { useAppContext } from '../context/AppContext'; // Ya no es necesario importar useAppContext aquí

const NavBar = () => {
  return (
    <Navbar bg='light' expand='md'>
      <Container>
        <Navbar.Brand as={Link} to='/'>Mercadito mayorista</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-between'>
          <Nav className='gap-3'>
            <Nav.Link as={Link} to='/'>Lista de productos</Nav.Link>
            {/* El enlace a /productDetails no es directo, se navega desde las tarjetas */}
            {/* <Nav.Link as={Link} to='/productDetails'>Ver más detalles</Nav.Link> */}
            <Nav.Link as={Link} to='/favorites'>Favoritos</Nav.Link> {/* NUEVO ENLACE */}
            <Nav.Link as={Link} to='/form'>Agregar Producto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;