import React from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

export const LoginModal: React.FC = () =>{
    return(
        <Container fluid>
        <Col>
          <Form>
            <h4>{ I18n.t('login') }</h4>
            
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{ I18n.t('email') }</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>{ I18n.t('password') }</Form.Label>
              <InputGroup>
                <Form.Control type="password" placeholder="Requirements " />
              </InputGroup>

            </Form.Group>
            
            <Row>
            <Button block variant = "dark" >{ I18n.t('login') }</Button>
            </Row>

          </Form>
        </Col>
      </Container>
    )
}