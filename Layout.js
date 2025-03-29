import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function Layout() {
    const location = useLocation();

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">My App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            as={Link}
                            to="/"
                            style={{
                                color: location.pathname === "/" ? "black" : "inherit",
                            }}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/ProductForm"
                            style={{
                                color: location.pathname === "/ProductForm" ? "green" : "inherit",
                            }}
                        >
                            Product Form
                        </Nav.Link>
                      
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Outlet />
        </>
    );
}

export default Layout;