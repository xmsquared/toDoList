import { useState , useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "react-datepicker/dist/react-datepicker.css";

import { TodoForm } from "../../components/todoForm/";
import { info_obj } from "../../interface/";
import { TodoTable } from "../../components/todoTable/";

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

const Todo: React.FC = () =>{

    const [info, setInfo] = useState<info_obj>({description: "", category: "css", content: "", deadline: new Date(), id: Math.floor(Math.random() * 1000)});
    const [selectData, setSelectData] = useState([]) as any;
    const [data, setData] = useState([]) as any;
    const [noteShow, setNoteShow] = useState(false);
    const [validShow, setValidShow] = useState(false);
    const [note, setNote] = useState("add/delete success");
    const [todoShow, setToDoShow] = useState(false);

    useEffect(() => {
        var keys = Object.keys(localStorage);
        
        const values = [] as any;
        if(keys.length > 0){
            var i = keys.length;
            while ( i-- ) {
                var temp_data = JSON.parse(localStorage.getItem(keys[i]) ?? '');
                values.push(temp_data);
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
                category: info.category,
                content: info.content,
                deadline: info.deadline.toLocaleDateString(),
                id: info.id,
            }
    
            localStorage.setItem(String(tempData.id), JSON.stringify(tempData));
    
            var tempResult = [...data];
            tempResult.push(tempData);
    
            setData([...tempResult]);
    
            setInfo({description: "", category: "css", content: "", deadline: new Date(), id: Math.floor(Math.random() * 1000)});
            setToDoShow(false);
    
            setNote(I18n.t('alertAdd'));

            setNoteShow(true);
        }
    }

    useEffect(() => {
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
        setNote(I18n.t('alertRemove'));

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
            
            setNote(I18n.t('alertRemove'));

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
                        <TodoForm  
                            handleInfoChange = {handleInfoChange}
                            addNew = {addNew}
                            handleDatePicker = {handleDatePicker}
                            validShow = {validShow}
                            description = {info.description}
                            category = {info.category} 
                            content = {info.content}
                            deadline = {info.deadline}
                        />
                    }
                </Col>

                <Col xs="auto">
                    <Button style={{marginBottom: "2rem"}} onClick={e=>setToDoShow(!todoShow)}>
                        {I18n.t('addNew')}
                    </Button> {' '}
                    <Button variant="danger" disabled={selectData.length<1} style={{marginBottom: "2rem"}} onClick={e=>deleteSelect(e)}>
                        {I18n.t('delete')}
                    </Button> {' '}
                    {data.length > 0 && 
                        <TodoTable
                            selectAll = { selectAll }
                            selectOne = { selectOne }
                            sortByDeadLine = { sortByDeadLine }
                            data = { data }
                            selectData = { selectData }
                            handleDelete = { handleDelete }
                        />
                    }
                </Col>
            </Row>
        </div>
    )
}

export default Todo;