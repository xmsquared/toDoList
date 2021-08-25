import React, { useState } from 'react';
import Navbar  from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { loggout , redirectToHome, removeTokenFromLocal } from '../../utils/';
import { useTokenContext } from '../../context';

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

library.add(faUser)

interface NavHeaderProps{
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

const NavHeader: React.FC<NavHeaderProps> = ({switchLocale}) => {
    const [login, setLogin] = useState(false);
    const {token} = useTokenContext();

    if(!login){
        if(token !== null){
            setLogin(true);
        }
    }

    const handleloggout = () => {
        if(token !== null){
            loggout(token)
            .then(res => {
                if(res){
                    removeTokenFromLocal();
                    setLogin(false);
                    redirectToHome();
                }
            })
        }
    }

    return(
        <Navbar bg="info" expand="md" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end">
                    <Nav.Item>
                    <Nav.Link href="/">{ I18n.t('home') }</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link href="/about">{ I18n.t('about') }</Nav.Link>
                    </Nav.Item>
                    {login &&                     
                        <Nav.Item>
                        <Nav.Link href="/todo">{ I18n.t('todo') }</Nav.Link>
                        </Nav.Item> 
                    }


                </Nav>
                <Nav className="ml-auto">
                    <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown">
                        {login ? (
                            <React.Fragment>
                                <NavDropdown.Item href="/todo">Todo List</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleloggout}>Log Out</NavDropdown.Item>
                            </React.Fragment> 
                        ):(
                            <React.Fragment>
                                <NavDropdown.Item href="/regist">Register</NavDropdown.Item>
                                <NavDropdown.Item href="/">Log in</NavDropdown.Item>
                            </React.Fragment> 
                        )}

                    </NavDropdown>
                    <NavDropdown title={ I18n.t('language') } id="basic-nav-dropdown">
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