import React from "react";
import { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { useTokenContext } from '../../App';
import { Login } from '../../interface/userInterface';
import { loginUserByEmail } from '../../utils/user/TodoApiService';

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

export const LoginModal: React.FC = () =>{
  const [detail, setDetail] = useState<Login>({email:'', password: ''});
  const [alertDetail, setAlertDetail] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { setToken} = useTokenContext();

  function onChangeInfo(e){
    const { name, value } = e.target;
    setDetail(prevState=>({
        ...prevState,
        [name]: value
    }))
  }

  useEffect(()=>{
    if(loggedIn){
      window.location.href = "/";
      setLoggedIn(false);
    }
    if(alertDetail){
      window.setTimeout(()=>{setAlertDetail(false)},3000);
    }
  }, [loggedIn, alertDetail])

  function login(e){
    e.preventDefault();
    
    loginUserByEmail(detail)
    .then(res => {
      if(res === "Unable to login"){
        setAlertDetail(true);
      }
      else if(res === "error"){
        setAlertDetail(true);
      }
      else{
        setToken(res.token);
        localStorage.setItem('token', JSON.stringify(res.token));
        setLoggedIn(true);
      }
    })
    
    setDetail({email:'', password: ''});
  }

  return(
      <Container fluid>
      <Col>
        <Form onSubmit={login}>
          <h4>{ I18n.t('login') }</h4>
          <Alert variant="danger" show={alertDetail}>
            Detail Entered doesn't match
          </Alert>
          
          <Form.Group controlId="loginEmail">
            <Form.Label>{ I18n.t('email') }</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={detail.email} onChange={onChangeInfo} required/>
          </Form.Group>

          <Form.Group controlId="loginPassword">
            <Form.Label>{ I18n.t('password') }</Form.Label>
            <InputGroup>
              <Form.Control type="password" placeholder="Enter your password" name="password"  value={detail.password} onChange={onChangeInfo} />
            </InputGroup>

          </Form.Group>
          
          <Row>
          <Button block variant = "dark" type="submit">{ I18n.t('login') }</Button>
          </Row>

        </Form>
      </Col>
    </Container>
    )
}