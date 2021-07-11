import { useState , useEffect } from "react";
import DatePicker from "react-datepicker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";


import "react-datepicker/dist/react-datepicker.css";

function Todo(props){
    const [info, setInfo] = useState({description: "", category: "css", content: "", deadline: new Date()});
    const [selectData, setSelectData] = useState([]);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        var keys = Object.keys(localStorage);
        
        var values = [];
        if(keys.length > 0){
            var i = keys.length;
            while ( i-- ) {
                values.push(JSON.parse(localStorage.getItem(keys[i])));
            }
            setData([...values]);
        } 
    }, [])

    function handleInfoChange(e) {
        const { name, value } = e.target;
        setInfo(prevState=>({
            ...prevState,
            [name]: value
        }))
    }

    function handleDatePicker(e){
        setInfo(prevState=>({
            ...prevState,
            "deadline": e
        }))
    }

    function selectAll(e){

        var checked = e.target.checked;
        if (checked) {
            var tempSelect = data.map(a=>a.id);
            setSelectData(tempSelect);
        } else {
            setSelectData([]);
        }
    }
 
    function selectOne(e, id){
        const checked = e.target.checked;
        if(checked){
            var tempSelect = [...selectData];
            tempSelect.push(id);
            setSelectData([...tempSelect])
        } else {
            var tempRemoveSelect = [...selectData];
            tempRemoveSelect = tempRemoveSelect.filter(function(item){
                return item !== id;
            });
            setSelectData(tempRemoveSelect);
        }
    }

    function addNew(e){
        e.preventDefault();
        var tempData = {
            description: info.description,
            Category: info.category,
            content: info.content,
            deadline: info.deadline.toLocaleDateString(),
            id: Math.floor(Math.random() * 1000),
        }

        localStorage.setItem(tempData.id, JSON.stringify(tempData));

        var tempResult = [...data];
        tempResult.push(tempData);

        setData([...tempResult]);

        setInfo({description: "", category: "css", content: "", deadline: new Date()})
    }

    function handleDelete(id){
        localStorage.removeItem(id);
        var tempResult = [...data];
        tempResult = tempResult.filter(function(item){
            return item.id !== id
        })

        setData([...tempResult]);
    }

    function deleteSelect(e){
        e.preventDefault();
        var i = selectData.length;
        if(i > 0){
            while(i--){
                var deleteId = selectData[i];
                localStorage.removeItem(deleteId);
            }
            var tempResult = [...data];
            tempResult = tempResult.filter(function(item){
                return !selectData.includes(item.id);
            })

            setSelectData([]);
            setData(tempResult);
        }
    }

    return(
        <div style={{marginTop: '2rem'}}>
            <Row style={{paddingLeft: '10%'}}>
                <Col xs="5">
                    <Form onSubmit={addNew}>
                        <Form.Group  as={Row} controlId="formBasicEmail">
                            <Form.Label column sm="3">Description</Form.Label>
                            <Col sm="5">
                                <Form.Control type="description" name="description" value={info.description} onChange={e => handleInfoChange(e)} />
                            </Col>
                        </Form.Group>

                        <Form.Group  as={Row} controlId="Category">
                            <Form.Label column sm="3">Category</Form.Label>
                            <Col sm="5">
                                <Form.Control as="select" name="category" value={info.category} onChange={e => handleInfoChange(e)}>
                                    <option value="css">css</option>
                                    <option value="html">html</option>
                                    <option value="js">js</option>
                                </Form.Control>
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} controlId="content">
                            <Form.Label column sm="3">Content</Form.Label>
                            <Col sm="5">
                                <Form.Control as="textarea" rows={2} name="content" value={info.content} onChange={e => handleInfoChange(e)}/>
                            </Col>
                            
                        </Form.Group>

                        <Form.Group as={Row} controlId="content">
                            <Form.Label column sm="3">Content</Form.Label>
                            <Col sm="5">
                                <DatePicker selected={info.deadline} onChange={(e) => handleDatePicker(e)} />
                            </Col>
                            
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>

                <Col xs="auto">
                    <Button style={{marginBottom: "2rem"}} onClick={e=>deleteSelect(e)}>
                        Delete selected
                    </Button>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>
                                <label>
                                <input
                                    type="checkbox"
                                    onChange={e=>selectAll(e)}
                                />
                                </label>
                            </th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Operate</th>
                            </tr>
                        </thead>
                        {data.length > 0?(
                            <tbody>
                            {
                                data.map((item, index)=> {
                                    return(
                                        <tr key={index}>
                                            <th>
                                                <label>
                                                <input
                                                    type="checkbox"
                                                    checked = {selectData.includes(item.id)}
                                                    onChange = {e => selectOne(e, item.id)}
                                                />
                                                </label>
                                            </th>
                                            <th onClick={e => window.location.href = "/todo/" + item.id}>{item.description}</th>
                                            <th>{item.Category}</th>
                                            <th style={{color: 'red'}} onClick={e=>handleDelete(item.id)}>delete</th>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>                  
                        ):(
                            <div></div>
                        )}

                    </Table>
                </Col>
            </Row>
        </div>
    )
}

export default Todo;