import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";

import { AlertMessage } from '../toastNote/alertMessage';

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

interface IProps{
    handleInfoChange: (e: any)=>void,
    addNew: (e: any)=>void,
    handleDatePicker: (e: any)=>void,
    validShow: boolean,
    description: string,
    category: string,
    content: string,
    deadline: Date,
    setValidShow: (e: any)=>void,
}

export const TodoForm: React.FC<IProps> = ({
    handleInfoChange,
    addNew,
    handleDatePicker,
    validShow,
    description,
    category,
    content,
    deadline,
    setValidShow
}) => {

    return(
        <Form onSubmit={addNew}>
            <Form.Group  as={Row} controlId="formBasicEmail">
                <Form.Label column sm="3">{I18n.t('description')}</Form.Label>
                <Col sm="5">
                    <Form.Control type="description" name="description" value={description} onChange={handleInfoChange} />
                </Col>
            </Form.Group>
            <AlertMessage message={I18n.t('alertValid')} show={validShow} styleVariant={"danger"} setTriggerFalse={setValidShow} />
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
    
            <Button variant="primary" type="submit">
                {I18n.t('submit')}
            </Button>
        </Form>
    )
}