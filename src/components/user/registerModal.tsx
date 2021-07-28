import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { User } from '../../interface/userInterface';
import { registerUser } from '../../utils/user/TodoApiService';
import { useTokenContext } from '../../App';

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

export const RegisterModal: React.FC = () =>{
  const [tempuser, setTempUser] = useState<User>({name: '', email: '', password: '', age: 0});
  
  const {setToken} = useTokenContext();

  function onChangeInfo(e){
    const { name, value } = e.target;
    setTempUser(prevState=>({
        ...prevState,
        [name]: value
    }))
  }

  function regist(e) {
    e.preventDefault();
    console.log(tempuser);
    registerUser(tempuser)
    .then(res => {
      setToken(res.token);
      localStorage.setItem('token', JSON.stringify(res.token));
    })
    .catch(res => console.log(res));
  }

  return(
      <Container fluid>
      <Col>
        <Form onSubmit={regist}>
          <h4>{ I18n.t('registerUser') }</h4>

          <Form.Group controlId="registUsername">
            <Form.Label>{ I18n.t('username') }</Form.Label>
            <Form.Control placeholder="Enter Username" name='name' onChange={onChangeInfo} required/>
          </Form.Group>

          <Form.Group controlId="registEmail">
            <Form.Label>{ I18n.t('email') }</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' onChange={onChangeInfo} required/>
          </Form.Group>

          <Form.Group controlId="registPassword">
            <Form.Label>{ I18n.t('password') }</Form.Label>
            <InputGroup>
              <Form.Control type="password" placeholder="password length must longer than 7" name='password' onChange={onChangeInfo} required/>
            </InputGroup>

          </Form.Group>

          <Form.Group controlId="registAge">
            <Form.Label>{ I18n.t('age') }</Form.Label>
            <Form.Control placeholder="Enter age" type="number" required name='age' onChange={onChangeInfo}/>
          </Form.Group>
          
          <Row>
          <Button block variant = "dark" type="submit" >{ I18n.t('registerUser') }</Button>
          </Row>

        </Form>
      </Col>
    </Container>
  )
}