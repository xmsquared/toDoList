import Navbar  from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Translate } from 'react-redux-i18n';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faUser)

interface Iprops{
    switchLocale: (code: string) => void
}

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

const NavHeader: React.FC<Iprops> = ({switchLocale}) => {

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
                </Nav>
                <Nav className="ml-auto">
                    <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown">
                       <NavDropdown.Item href="/todo">Todo List</NavDropdown.Item>
                       <NavDropdown.Item href="/todo">Log Out</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title={<Translate value="language"/>} id="basic-nav-dropdown">
                        {                               
                            languages.map((item, index)=> {
                                return(
                                    <NavDropdown.Item key={index} onClick={() => switchLocale(item.code)}>{item.name}</NavDropdown.Item>
                                )
                            })
                        }
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}

export default NavHeader