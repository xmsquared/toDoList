import { useState , useEffect, useCallback } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";

import { LoadingSpinnerButton } from "../../components/spinner/loadingSpinner";
import { AlertMessage } from "../../components/toastNote/alertMessage";
import { TodoForm } from "../../components/todoForm/";
import { DefaultInfo, DefaultNote, NoteType } from "../../interface/";
import { TodoTable } from "../../components/todoTable/";
import { addTask, getAllTask, deleteTask, redirectToHome, dateToNum } from '../../utils/';
import { useTokenContext } from '../../context/';

declare function require(name:string);
var I18n = require('react-redux-i18n').I18n;

const Todo: React.FC = () =>{
    const {token} = useTokenContext();
    const [info, setInfo] = useState(DefaultInfo);
    const [note, setNote] = useState(DefaultNote);
    const [selectData, setSelectData] = useState([]) as any;
    const [data, setData] = useState([]) as any;

    const [noteShow, setNoteShow] = useState(false);
    const [validShow, setValidShow] = useState(false);
    const [todoShow, setToDoShow] = useState(false);
    const [addNewLoading, setAddNewLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        getAllTask(token)
        .then(res => {
            if(res.todoNum > 0) {
                setData([...res.todoList])
            }
        });



    }, [token])
    
    const createNote = useCallback(
        (message: string, type: NoteType) => {
            if (deleteLoading) setDeleteLoading(false);

            if (addNewLoading) setAddNewLoading(false);

            setNote({
                message: message,
                type: type
            });

            setNoteShow(true);
        } ,
        [addNewLoading, deleteLoading],
      )

    const sortByDeadLine = () => {
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

    const handleInfoChange = (e) => {
        const { name, value } = e.target;
        setInfo(prevState=>({
            ...prevState,
            [name]: value
        }))
    }

    const handleDatePicker = (e) => {
        setInfo(prevState=>({
            ...prevState,
            "deadline": e
        }))
    }

    const selectAll = (e) => {

        var checked = e.target.checked;
        if (checked) {
            var tempSelect = data.map(a=>a.id);
            setSelectData(tempSelect);
        } else {
            setSelectData([]);
        }
    }
 
    const selectOne = (e, id) => {
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

    const addNew = (e) => {
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
                    createNote(I18n.t('alertAdd'), NoteType.success);
                } else {
                    createNote("add new task failed, please tried again later!", NoteType.failure);
                }
            })

        }
    }

    const handleDelete = (id) =>{
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

    const deleteOne = (id) => {
        setDeleteLoading(true);
        if(handleDelete(id)){
            var tempResult = [...data];
            tempResult = tempResult.filter(function(item){
                return item.id !== id
            });
            setData(tempResult);
            createNote(I18n.t('alertRemove'), NoteType.success);
        }else{
            createNote('delete unsuccessful, please re-try it agian!', NoteType.failure);
        }
        
    }

    const deleteSelect = (e) => {
        e.preventDefault();
        setDeleteLoading(true);
        var i = selectData.length;
        if(i > 0){
            while(i--){
                var deleteId = selectData[i];
                if(!handleDelete(deleteId)){
                    createNote('delete unsuccessful, please re-try it agian!', NoteType.failure);
                    redirectToHome();
                    break;
                }
            }
            var tempResult = [...data];
            tempResult = tempResult.filter(function(item){
                return !selectData.includes(item.id);
            })

            setSelectData([]);
            setData(tempResult);
            createNote(I18n.t('alertRemove'), NoteType.success);
        }
    }

    const clearInput = () => {
        setInfo(DefaultInfo);
    }

    return(
        <div style={{marginTop: '2rem'}}>
            <Row style={{paddingLeft: '10%'}}>

                <Col xs="auto">
                    {addNewLoading ? (
                        <LoadingSpinnerButton />
                    ):(
                        <Button block onClick={e=>setToDoShow(!todoShow)}>
                            {I18n.t('addNew')}
                        </Button>
                    )}
                    {deleteLoading? (
                        <LoadingSpinnerButton />
                    ):(
                        <Button block variant="danger" disabled={selectData.length<1} style={{marginBottom: "2rem"}} onClick={e=>deleteSelect(e)}>
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

            <TodoForm  
                handleInfoChange = {handleInfoChange}
                addNew = {addNew}
                handleDatePicker = {handleDatePicker}
                validShow = {validShow}
                description = {info.description}
                category = {info.category} 
                content = {info.content}
                deadline = {info.deadline}
                setValidShow = {setValidShow}
                todoShow = {todoShow}
                setTodoShow = {setToDoShow}
                clearInput = {clearInput}
            />

            <AlertMessage show={noteShow} setTriggerFalse={setNoteShow} noteDetail={note}/>
        </div>
    )
}

export default Todo;