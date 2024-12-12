import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';

const NavbarComponent = () => {
  const { child, setChild } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        credentials: 'include', // Ensures cookies are sent with the request
      });

      if (response.ok) {
        toast.success('Logged out successfully!');
        window.location.href = '/'; // Redirect to the home or login page
      } else {
        const errorData = await response.json();
        toast.error(`Logout failed: ${errorData.error}`);
      }
    } catch (error) {
      toast.error('An error occurred during logout. Please try again.');
    }
  };

  return (
    <Navbar expand="lg" className="custom-dark-navbar">
      <Navbar.Brand as={Link} to="/">Emoti-Learn</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/child-login">Child Login</Nav.Link>
          <Nav.Link as={Link} to="/admin-login">Admin Login</Nav.Link>
          <Nav.Link as={Link} to="/child-register">Child Register</Nav.Link>
          {!!child && (
            <Nav.Item>
              <Button variant="link" onClick={handleLogout}>Logout</Button>
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
