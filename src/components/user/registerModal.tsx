import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import { User , DefaultUser } from '../../interface/userInterface';
import { registerUser } from '../../utils/user/TodoApiService';
import { useTokenContext } from '../../context';

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

export const RegisterModal: React.FC = () =>{
  const {setToken} = useTokenContext();
  const [tempuser, setTempUser] = useState<User>(DefaultUser);
  const [registerLoading, setRegisterLoading] = useState(false);

  const onChangeInfo = (e) => {
    const { name, value } = e.target;
    setTempUser(prevState=>({
        ...prevState,
        [name]: value
    }))
  }

  const register = (e) => {
    e.preventDefault();
    console.log(tempuser);
    setRegisterLoading(true);
    
    registerUser(tempuser)
    .then(res => {
      if(res.status){
        setToken(res.token);
        localStorage.setItem('token', JSON.stringify(res.token));
        setRegisterLoading(false);
      } else {
        setRegisterLoading(false);
      }

    })
    .catch(res => console.log(res));
  }

  return(
      <Container fluid>
      <Col>
        <Form onSubmit={register}>
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
            {registerLoading? (
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
              <Button block variant = "dark" type="submit" >{ I18n.t('registerUser') }</Button>
            )}

          </Row>

        </Form>
      </Col>
    </Container>
  )
}