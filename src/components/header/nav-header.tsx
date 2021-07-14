import Navbar  from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Translate } from 'react-redux-i18n';

const NavHeader: React.FC = () => {
    const languages = [
        {
          code: 'en',
          name: 'english(US)',
        },
        {
          code: 'zh',
          name: '汉语',
        },
    ]
    return(
        <Navbar bg="info" expand="md" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end">
                    <Nav.Item>
                    <Nav.Link href="/todo"><Translate value="todo"/></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link href="/about"><Translate value="about"/></Nav.Link>
                    </Nav.Item>
                    <NavDropdown title={<Translate value="language"/>} id="basic-nav-dropdown">
                        {                               
                            languages.map((item, index)=> {
                                return(
                                    <NavDropdown.Item key={index}>{item.name}</NavDropdown.Item>
                                )
                            })
                        }
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}

export default NavHeader;