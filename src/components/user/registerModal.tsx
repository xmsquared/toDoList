import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

export const RegisterModal: React.FC = () =>{
  console.log("re-rendered")
    return(
        <Container fluid>
        <Col>
          <Form>
            <h4>{ I18n.t('registerUser') }</h4>

            <Form.Group controlId="formBasicUsername">
              <Form.Label>{ I18n.t('username') }</Form.Label>
              <Form.Control placeholder="Enter Username" />
            </Form.Group>

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

            <Form.Group controlId="formBasicRePassword">
              <Form.Label>{ I18n.t('rePassword') }</Form.Label>
              <Form.Control type="password" placeholder="Re-Enter Password" />
            </Form.Group>

            <Form.Group controlId="formBasicUserAge">
              <Form.Label>{ I18n.t('age') }</Form.Label>
              <Form.Control placeholder="Enter age" type="number" />
            </Form.Group>
            
            <Row>
            <Button block variant = "dark" >{ I18n.t('registerUser') }</Button>
            </Row>

          </Form>
        </Col>
      </Container>
    )
}