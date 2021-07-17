import Navbar  from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Translate } from 'react-redux-i18n';
import { connect } from 'react-redux';
import store from '../../i18n/store';
import { setLocale } from 'react-redux-i18n';

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

    const switchLocale = (code: string) => {
        store.dispatch(setLocale(code))
    }

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

export default connect()(NavHeader)