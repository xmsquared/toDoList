import React, { useState, useEffect, useCallback}  from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { LoadingSpinnerButton } from "../spinner/loadingSpinner";
import { updateProfile, getUserDetailByToken } from '../../utils';
import { useTokenContext } from '../../context';
import { AlertMessage } from "../toastNote/alertMessage";
import { User , DefaultUser, DefaultNote, NoteType } from "../../interface";

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

export const ProfileModal: React.FC = () =>{
  const {token} = useTokenContext();
  const [userInfo, setUserInfo] = useState<User>(DefaultUser);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [note, setNote] = useState(DefaultNote);
  
  useEffect(()=>{
    getUserDetailByToken(token)
    .then(res =>{
      setUserInfo({name: res.name, age: res.age, email: res.email, password: ''})
    })
  }, [token]);

  const createNote = useCallback(
    (message: string, type: NoteType) => {
      setUpdateAlert(true);
      setUpdateLoading(false);
      setNote({
          message: message,
          type: type
      })
    } ,
    [],
  )

  const onChangeInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState=>({
        ...prevState,
        [name]: value
    }))
  }

  const updateInfo = (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    updateProfile(userInfo, token)
    .then(res => {
      if (res){
        createNote(I18n.t('updateSuccess') , NoteType.success);
      }else{
        createNote(I18n.t('updateFailure') , NoteType.failure);
        
      }
    });
  }

  return(
      <Container fluid>
      <Col>
        <Form onSubmit={updateInfo}>
          <h4>{ I18n.t('profile') }</h4>

          <Form.Group controlId="ProfileUsername">
            <Form.Label>{ I18n.t('username') }</Form.Label>
            <Form.Control placeholder="Enter Username" required value={userInfo.name} name="name" onChange={onChangeInfo} />
          </Form.Group>

          <Form.Group controlId="ProfileEmail">
            <Form.Label>{ I18n.t('email') }</Form.Label>
            <Form.Control type="email" placeholder="Enter email" disabled value={userInfo.email} name="email" onChange={onChangeInfo}/>
          </Form.Group>

          <Form.Group controlId="ProfilePassword">
            <Form.Label>{ I18n.t('password') }</Form.Label>
            <InputGroup>
              <Form.Control type="password" placeholder="Requirements" required value={userInfo.password} name="password" onChange={onChangeInfo}/>
            </InputGroup>

          </Form.Group>

          <Form.Group controlId="ProfileAge">
            <Form.Label>{ I18n.t('age') }</Form.Label>
            <Form.Control placeholder="Enter age" type="number" value={userInfo.age} name="age" onChange={onChangeInfo}/>
          </Form.Group>
          
          <Row>
            {updateLoading?(
              <LoadingSpinnerButton />
              
            ):(
              <Button block variant = "dark" type="submit">{ I18n.t('updateInfo') }</Button>
            )}
          
          </Row>
          <AlertMessage show={updateAlert} setTriggerFalse={setUpdateAlert} noteDetail={note}/>

        </Form>
      </Col>
    </Container>
  )
}