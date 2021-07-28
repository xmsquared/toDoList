import React, { useState, useEffect}  from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { User , DefaultUser} from '../../interface/userInterface';
import { updateProfile, getUserDetailByToken } from '../../utils/user/TodoApiService';
import { useTokenContext } from '../../context';

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

export const ProfileModal: React.FC = () =>{
  const {token} = useTokenContext();
  const [userInfo, setUserInfo] = useState<User>(DefaultUser);
  const [updateSuccess, setUpdateSuccess] = useState(true);
  
  useEffect(()=>{
    const tempToken = JSON.parse(token);
    getUserDetailByToken(tempToken)
    .then(res =>{
      setUserInfo({name: res.name, age: res.age, email: res.email, password: ''})
    })
  }, [token]);

  useEffect(()=>{
    if(updateSuccess){
      window.setTimeout(()=>{setUpdateSuccess(false)},3000);
    }
  }, [updateSuccess])

  const onChangeInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState=>({
        ...prevState,
        [name]: value
    }))
  }

  const updateInfo = (e) => {
    e.preventDefault();
    console.log(userInfo);
    const tempToken = JSON.parse(token);
    updateProfile(userInfo, tempToken)
    .then(res => {
      if (res){
        setUpdateSuccess(true);
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

          <Form.Group controlId="formBasicUserAge">
            <Form.Label>{ I18n.t('age') }</Form.Label>
            <Form.Control placeholder="Enter age" type="number" value={userInfo.age} name="age" onChange={onChangeInfo}/>
          </Form.Group>
          
          <Row>
          <Button block variant = "dark" type="submit">{ I18n.t('updateInfo') }</Button>
          </Row>
          <Alert variant="success" show={updateSuccess}>
            update detail success!
          </Alert>

        </Form>
      </Col>
    </Container>
  )
}