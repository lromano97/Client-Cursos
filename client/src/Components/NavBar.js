import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavBar() {
    const aElements = {
        textDecoration: 'none',
        marginRight: 20,
        color: 'white'
    };
    return (
        <Navbar style={{ backgroundColor: '#ec8f32' }} expand="lg" fixed="top">
            <Navbar.Brand>
                <NavLink to="/" style={aElements}>
                    DBlandIT
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink to="/cursos" style={aElements}>
                        Cursos
                    </NavLink>
                    <NavLink to="/crearCurso" style={aElements}>
                        Crear curso
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
