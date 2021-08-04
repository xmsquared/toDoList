import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import { Login , DefaultLogin} from '../../interface/';
import { loginUserByEmail , redirectToHome } from '../../utils/';
import { useTokenContext } from "../../context";

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

export const LoginModal: React.FC = () => {
  const {setToken} = useTokenContext();
  const [detail, setDetail] = useState<Login>(DefaultLogin);
  const [alertDetail, setAlertDetail] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  
  function onChangeInfo(e){
    const { name, value } = e.target;
    setDetail(prevState=>({
        ...prevState,
        [name]: value
    }))
  }

  useEffect(()=>{
    if(alertDetail){
      window.setTimeout(()=>{setAlertDetail(false)},3000);
    }
    if(loggedIn){
      redirectToHome();
    }
  }, [loggedIn, alertDetail])

  function login(e){
    e.preventDefault();
    setLoginLoading(true);
    loginUserByEmail(detail)
    .then(res => {
      if(res.status){
        setToken(res.token);
        localStorage.setItem('token', JSON.stringify(res.token));
        setLoginLoading(false);
        setLoggedIn(true);
      }else{
        setAlertDetail(true);
        setLoginLoading(false);
      }
    })
    
    setDetail(DefaultLogin);
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
            {loginLoading ? (
              <Button block variant="dark" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
                Loading...
              </Button>
            ):(
              <Button block variant = "dark" type="submit">{ I18n.t('login') }</Button>
            )}
            
          </Row>

        </Form>
      </Col>
    </Container>
    )
}