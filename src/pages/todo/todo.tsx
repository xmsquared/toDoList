import { useState , useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from 'react-bootstrap/Spinner';
import "react-datepicker/dist/react-datepicker.css";

import { TodoForm } from "../../components/todoForm/";
import { DefaultInfo} from "../../interface/";
import { TodoTable } from "../../components/todoTable/";
import { addTask, getAllTask, deleteTask } from '../../utils/task/taskApiService';
import { useTokenContext } from '../../context/';

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

const Todo: React.FC = () =>{
    const {token} = useTokenContext();
    const [info, setInfo] = useState(DefaultInfo);
    const [selectData, setSelectData] = useState([]) as any;
    const [data, setData] = useState([]) as any;

    const [noteShow, setNoteShow] = useState(false);
    const [validShow, setValidShow] = useState(false);
    const [note, setNote] = useState("add/delete success");
    const [todoShow, setToDoShow] = useState(false);
    const [addNewLoading, setAddNewLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        getAllTask(token)
        .then(res => {
            if(res.todoNum > 0) {
                setData([...res.todoList])
            }
        })

    }, [token])

    const dateToNum = (d) => {
        var time = d.toLocaleDateString()
        time = time.split("/"); 
        return Number(time[0]+time[1]+time[2]);
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
            setAddNewLoading(true);
            var tempData = info.description + "||" + info.category + "||" + info.content + "||" + info.deadline.toLocaleDateString();
            addTask(token, tempData)
            .then(res => {
                if(res.status){
                    const tempInfo = {
                        description: info.description,
                        category: info.category,
                        content: info.content,
                        deadline: info.deadline,
                        id: res.id
                    }
                    var tempResult = [...data];
                    tempResult.push(tempInfo);
                    setData([...tempResult]);
                    setInfo(DefaultInfo);
                    setToDoShow(false);
                    setNote(I18n.t('alertAdd'));
                    setNoteShow(true);
                    setAddNewLoading(false);
                } else {
                    setNote("add new task failed, please tried again later!");
                    setNoteShow(true);
                    setAddNewLoading(false);
                }
            })

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
        return deleteTask(token, id)
        .then(res => {
            if(res.status){
                return true
            }else{
                return false
            }
        })
        .catch(error => {
            return false
        })
    }

    function deleteOne(id){
        setDeleteLoading(true);
        if(handleDelete(id)){
            var tempResult = [...data];
            tempResult = tempResult.filter(function(item){
                return item.id !== id
            });
            setData(tempResult);
            setDeleteLoading(false);
            setNote(I18n.t('alertRemove'));
            setNoteShow(true);
        }else{
            setDeleteLoading(false);
            setNote('delete unsuccessful, please re-try it agian!');
            setNoteShow(true);
        }
        
    }

    function deleteSelect(e){
        e.preventDefault();
        setDeleteLoading(true);
        var i = selectData.length;
        if(i > 0){
            while(i--){
                var deleteId = selectData[i];
                if(!handleDelete(deleteId)){
                    setDeleteLoading(false);
                    setNote('delete unsuccessful, please re-try it agian!');
                    setNoteShow(true);
                    window.location.href = '/';
                    break;
                }
            }
            var tempResult = [...data];
            tempResult = tempResult.filter(function(item){
                return !selectData.includes(item.id);
            })

            setSelectData([]);
            setData(tempResult);
            setDeleteLoading(false);
            setNote(I18n.t('alertRemove'));
            setNoteShow(true);
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
                    {addNewLoading ? (
                        <Button style={{marginBottom: "2rem"}} disabled>
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
                        <Button style={{marginBottom: "2rem"}} onClick={e=>setToDoShow(!todoShow)}>
                            {I18n.t('addNew')}
                        </Button>
                    )}
                    {' '}
                    {deleteLoading? (
                        <Button variant="danger" disabled style={{marginBottom: "2rem"}}>
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
                        <Button variant="danger" disabled={selectData.length<1} style={{marginBottom: "2rem"}} onClick={e=>deleteSelect(e)}>
                            {I18n.t('delete')}
                        </Button> 
                    )}
                    {' '}
                    {data.length > 0 && 
                        <TodoTable
                            selectAll = { selectAll }
                            selectOne = { selectOne }
                            sortByDeadLine = { sortByDeadLine }
                            data = { data }
                            selectData = { selectData }
                            deleteOne = { deleteOne }
                        />
                    }
                </Col>
            </Row>
        </div>
    )
}

export default Todo;