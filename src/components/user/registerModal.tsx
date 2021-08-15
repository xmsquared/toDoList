import React, { useState, useEffect, useCallback } from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { LoadingSpinnerButton } from '../../components/spinner/loadingSpinner';
import { User , DefaultUser } from '../../interface/userInterface';
import { registerUser, checkPass } from '../../utils/';
import { useTokenContext } from '../../context';

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

export const RegisterModal: React.FC = () =>{
  const {setToken} = useTokenContext();
  const [tempuser, setTempUser] = useState<User>(DefaultUser);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [regitsterSuccess, setRegisterSuccess] = useState(false);
  const [regitsterFailure, setRegitsterFailure] = useState(false);

  useEffect(() => {
    if(passwordLength){
      window.setTimeout(()=>{setPasswordLength(false)},3000);
    }

    if(regitsterSuccess){
      window.setTimeout(()=>{setRegisterSuccess(false)},3000);
    }

    if(regitsterFailure){
      window.setTimeout(()=>{setRegitsterFailure(false)},3000);
    }
  }, [passwordLength, regitsterSuccess, regitsterFailure])

  const onChangeInfo = useCallback(e =>{
    const { name, value } = e.target;
    setTempUser(prevState=>({
        ...prevState,
        [name]: value
    }))
  }, [])

  const register = (e) => {
    e.preventDefault();
    console.log(tempuser);
    setRegisterLoading(true);

    if(checkPass(tempuser.password)){
      registerUser(tempuser)
      .then(res => {
        if(res.status){
          setRegisterSuccess(true);
          setRegisterLoading(false);
          localStorage.setItem('token', JSON.stringify(res.token));
          setToken(res.token);
        } else {
          setRegitsterFailure(true);
          setRegisterLoading(false);
        }
  
      })
      .catch(res => console.log(res));
    }else{
      setPasswordLength(true);
      setRegisterLoading(false);
    }
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
            <Alert variant="danger" show={passwordLength}>
              { I18n.t('passwordLength') }
            </Alert>
          </Form.Group>

          <Form.Group controlId="registAge">
            <Form.Label>{ I18n.t('age') }</Form.Label>
            <Form.Control placeholder="Enter age" type="number" required name='age' onChange={onChangeInfo}/>
          </Form.Group>
          
          <Row>
            {registerLoading? (
              <LoadingSpinnerButton />
            ):(
              <Button block variant = "dark" type="submit" >{ I18n.t('registerUser') }</Button>
            )}

          </Row>

          <Alert variant="danger" show={regitsterFailure}>
            { I18n.t('registerFailure') }
          </Alert>

          
          <Alert variant="success" show={regitsterSuccess}>
            { I18n.t('registerSuccess') }
          </Alert>

        </Form>
      </Col>
    </Container>
  )
}