import React, { useState, useEffect, useMemo, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { LoadingSpinnerButton } from "../spinner/loadingSpinner";

import { Login , DefaultLogin, NoteType } from '../../interface/';
import { loginUserByEmail , redirectToHome, saveTokenToLocal } from '../../utils/';
import { useTokenContext } from "../../context";
import { AlertMessage } from "../toastNote/alertMessage";
declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

export const LoginModal: React.FC = () => {
  const {setToken} = useTokenContext();
  const [detail, setDetail] = useState<Login>(DefaultLogin);
  const [note, setNote] = useState({message: "Detail Entered doesn't match", type: NoteType.failure});
  const [alertDetail, setAlertDetail] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const onChangeInfo = useCallback(e =>{
    const { name, value } = e.target;
    setDetail(prevState=>({
        ...prevState,
        [name]: value
    }))
  }, [])


  useEffect(()=>{
    if(loggedIn){
      redirectToHome();
    }
  }, [loggedIn])

  const login = (e) => {
    e.preventDefault();
    console.log(detail);
    setLoginLoading(true);
    
    loginUserByEmail(detail)
    .then(res => {
      if(res.status){
        setToken(res.token);
        saveTokenToLocal(JSON.stringify(res.token));
        setLoginLoading(false);
        setLoggedIn(true);
      }else{
        setAlertDetail(true);
        setLoginLoading(false);
      }
    })
    
    setDetail(DefaultLogin);
  }

  const LoadingSpinner = useMemo(() => {
    return (
      <LoadingSpinnerButton />
    )
  }, [])

  return(
      <Container fluid>
      <Col>
        <Form onSubmit={login}>
          <h4>{ I18n.t('login') }</h4>
          <AlertMessage show={alertDetail} setTriggerFalse={setAlertDetail} noteDetail={note}/>
          
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
              LoadingSpinner
            ):(
              <Button block variant = "dark" type="submit">{ I18n.t('login') }</Button>
            )}
            
          </Row>

        </Form>
      </Col>
    </Container>
    )
}