import { useState , useEffect } from "react";
import DatePicker from "react-datepicker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

import "react-datepicker/dist/react-datepicker.css";

const Todo: React.FC = () =>{
    const [info, setInfo] = useState({description: "", category: "css", content: "", deadline: new Date()});
    const [todoShow, setToDoShow] = useState(false);
    const [selectData, setSelectData] = useState([]);
    const [data, setData] = useState([]);
    const [noteShow, setNoteShow] = useState(false);
    const [validShow, setValidShow] = useState(false);
    const [note, setNote] = useState("add/delete success");

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

    function dateToNum(d) {
        d = d.split("/"); return Number(d[0]+d[1]+d[2]);
    }

    function sortByDeadLine(){
        var tempData = [...data];
        if(data.length > 1){
            if(dateToNum(data[0].deadline) > dateToNum(data[1].deadline)){
                tempData.sort(function(a,b){
                    return dateToNum(a.deadline) - dateToNum(b.deadline)
                });
            }else{
                tempData.sort(function(a,b){
                    return dateToNum(b.deadline) - dateToNum(a.deadline)
                });
            }
            setData([...tempData]);
        }
        
    }

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
        if(info.description === ""){
            setValidShow(true);
        } else {
            var tempData = {
                description: info.description,
                Category: info.category,
                content: info.content,
                deadline: info.deadline.toLocaleDateString(),
                id: Math.floor(Math.random() * 1000),
            }
    
            localStorage.setItem(String(tempData.id), JSON.stringify(tempData));
    
            var tempResult = [...data];
            tempResult.push(tempData);
    
            setData([...tempResult]);
    
            setInfo({description: "", category: "css", content: "", deadline: new Date()});
            setToDoShow(false);
    
            setNote("add new success!");

            setNoteShow(true);
        }
    }

    useEffect(() => {
        console.log("this happens");
        if(noteShow){
            window.setTimeout(()=>{setNoteShow(false)},2000)
        }
        if(validShow){
            window.setTimeout(()=>{setValidShow(false)},2000)
        }
    }, [noteShow, validShow])

    function handleDelete(id){
        localStorage.removeItem(id);
        var tempResult = [...data];
        tempResult = tempResult.filter(function(item){
            return item.id !== id
        })

        setData([...tempResult]);
        setNote("delete success!");

        setNoteShow(true);
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

            setNote("delete success!");

            setNoteShow(true)
        }
    }

    return(
        <div style={{marginTop: '2rem'}}>
            <Alert variant="success" show={noteShow}>
                {note}
            </Alert>
            <Row style={{paddingLeft: '10%'}}>
                <Col xs="5">
                    {todoShow &&
                        <Form onSubmit={addNew}>
                        <Form.Group  as={Row} controlId="formBasicEmail">
                            <Form.Label column sm="3">Description</Form.Label>
                            <Col sm="5">
                                <Form.Control type="description" name="description" value={info.description} onChange={e => handleInfoChange(e)} />
                            </Col>
                        </Form.Group>
                        <Alert variant="danger" show={validShow}>
                            Please fill in description
                        </Alert>
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
                    }
                    
                </Col>

                <Col xs="auto">
                    <Button style={{marginBottom: "2rem"}} onClick={e=>setToDoShow(!todoShow)}>
                        Add New
                    </Button> {' '}
                    <Button variant="danger" disabled={selectData.length<1} style={{marginBottom: "2rem"}} onClick={e=>deleteSelect(e)}>
                        Delete selected
                    </Button> {' '}
                    {data.length > 0 && 
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
                                <th onClick={e=>sortByDeadLine()}>Deadline</th>
                                <th>Operate</th>
                                </tr>
                            </thead>
                    
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
                                            <th>{item.deadline}</th>
                                            <th style={{color: 'red'}} onClick={e=>handleDelete(item.id)}>delete</th>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>                  
                        </Table>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default Todo;