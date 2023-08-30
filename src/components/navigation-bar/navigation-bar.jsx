import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";
import logoImage from "../../img/logo.jpg";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar
      className="navbar p-0 bg-body-tertiary font-monospace mx-0"
      data-bs-theme="dark"
      expand="lg"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image src={logoImage} alt="Logo" className="logo-image" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
