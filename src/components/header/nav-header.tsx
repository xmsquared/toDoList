import Navbar  from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavHeader: React.FC = () => {
    return(
        <Navbar bg="info" expand="md" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end">
                    <Nav.Item>
                    <Nav.Link href="/todo">todo</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link href="/about">about</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}

export default NavHeader;