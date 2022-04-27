import './Header.css'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//import Nav from 'react-bootstrap/Nav';
export function Header() {
    return (
        <Navbar bg="light" expand="lg" >
            <Container className='header'>
                <Navbar.Brand href="#home">Evolute System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link"  to="home">Home</Link>
                        <Link className="nav-link" to="uploadapk">Upload Apk</Link>
                        <Link className="nav-link" to="#link">About Us</Link>
                        <Link className="nav-link" to="#link">Contact Us</Link>
                        <Link className="nav-link" to="#link">Link</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    )
}