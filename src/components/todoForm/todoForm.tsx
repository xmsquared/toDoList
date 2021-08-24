import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";

import { MouseEvent, useCallback } from 'react';
import { AlertMessage } from '../toastNote/alertMessage';
import { useState } from "react";
import { FormExitConfirm } from './';
import { NoteType } from "../../interface/";

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

interface TodoFormProps{
    handleInfoChange: (e: any)=>void,
    addNew: (e: any )=>void,
    handleDatePicker: (e: MouseEvent)=>void,
    validShow: boolean,
    description: string,
    category: string,
    content: string,
    deadline: Date,
    setValidShow: (e: boolean)=>void,
    todoShow: boolean,
    setTodoShow: (e: boolean)=>void,
    clearInput: ()=>void,
}

export const TodoForm: React.FC<TodoFormProps> = ({
    handleInfoChange,
    addNew,
    handleDatePicker,
    validShow,
    description,
    category,
    content,
    deadline,
    setValidShow,
    todoShow,
    setTodoShow,
    clearInput
}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [note, setNote] = useState({message: I18n.t('alertValid'), type: NoteType.failure});
    
    const handleClose = useCallback(
        () => {
            const today = new Date();
            
            if ( description !== '' || category !== 'css' || content !== '' || deadline.toLocaleDateString() !== today.toLocaleDateString()){
                setShowConfirm(true);
            } else {
                setTodoShow(false);
                clearInput();
            }
            
        },
        [category, clearInput, content, deadline, description, setTodoShow]
    )

    return(
        <Modal
            show={todoShow}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >

        <FormExitConfirm 
            showConfirm = { showConfirm }
            setTodoShow = { setTodoShow }
            setShowConfirm = { setShowConfirm }
            clearInput = { clearInput }
        />

        <Modal.Header closeButton>
            <Modal.Title>Add a new todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={addNew}>
                <Form.Group  as={Row} controlId="formBasicEmail">
                    <Form.Label column sm="3">{I18n.t('description')}</Form.Label>
                    <Col sm="5">
                        <Form.Control type="description" name="description" value={description} onChange={handleInfoChange} />
                    </Col>
                </Form.Group>

                <AlertMessage show={validShow} setTriggerFalse={setValidShow} noteDetail={note}/>

                <Form.Group  as={Row} controlId="Category">
                    <Form.Label column sm="3">{I18n.t('category')}</Form.Label>
                    <Col sm="5">
                        <Form.Control as="select" name="category" value={category} onChange={handleInfoChange}>
                            <option value="css">css</option>
                            <option value="html">html</option>
                            <option value="js">js</option>
                        </Form.Control>
                    </Col>
        
                </Form.Group>
        
                <Form.Group as={Row} controlId="content">
                    <Form.Label column sm="3">{I18n.t('content')}</Form.Label>
                    <Col sm="5">
                        <Form.Control as="textarea" rows={2} name="content" value={content} onChange={handleInfoChange}/>
                    </Col>
                    
                </Form.Group>
        
                <Form.Group as={Row} controlId="content">
                    <Form.Label column sm="3">{I18n.t('deadline')}</Form.Label>
                    <Col sm="5">
                        <DatePicker selected={deadline} onChange={handleDatePicker} />
                    </Col>
                    
                </Form.Group>

                <div style = {{ width: '100%' }}>
                    <Button variant="primary" type="submit">
                        {I18n.t('submit')}
                    </Button>

                    <Button variant="secondary" style = {{ position: 'absolute' , right: '15px'}} onClick={handleClose}>
                        Close
                    </Button>
                </div>
                
            </Form>

        </Modal.Body>
    </Modal>
        
    )
}