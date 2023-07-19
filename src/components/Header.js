import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../image/logo_restaurant.jpg";

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="Restaurant" className="nav-link">
              Restaurant
            </NavLink>
            <NavLink to="Table" className="nav-link">
              Table
            </NavLink>
            <NavLink to="Customer" className="nav-link">
              Customer
            </NavLink>
            <NavLink to="Product" className="nav-link">
              Product
            </NavLink>
            <NavLink to="Order" className="nav-link">
              Order
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
