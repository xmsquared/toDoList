import axios from "axios";
import {ResData} from '../../interface/';

export function addTask(token: string, detail: string): any{
    const addTask_url = "https://api-nodejs-todolist.herokuapp.com/task";
    const config = headerAdding(token);
    const payLoad = {
        description: detail
    }
    return axios.post(addTask_url, payLoad, config)
            .then(res => {
                return {
                    status: res.data.success,
                    id: res.data.data._id
                }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    status: false,
                    error: error
                }
            })
}

export function getAllTask(token: string): any{
    const getAllTask_url = "https://api-nodejs-todolist.herokuapp.com/task";
    const config = headerAdding(token);

    return axios.get(getAllTask_url, config)
            .then(res => {
                if (res.data.count > 0) {
                    const convertedData = convertWholeArray(res.data.data);
                    return {
                        status: true,
                        todoList: convertedData,
                        todoNum: res.data.count
                    }
                }else{
                    return {
                        status: true,
                        todoNum: res.data.count
                    }
                }

            })
            .catch(function (error) {
                console.log(error);
                return {
                    status: false,
                    error: error
                }
            })
}

export function getOneTask(token: string, id: string): any{
    const getOneTask_url = "https://api-nodejs-todolist.herokuapp.com/task/" + id ;
    const config = headerAdding(token);

    return axios.get(getOneTask_url, config)
            .then(res => {
                return {
                    status: res.data.success,
                    data: transferDataFormat(res.data.data)
                }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    status: false,
                    error: error
                }
            })
}

export function getTaskByPagination(token: string): any{
    const taskPagination_url = "https://api-nodejs-todolist.herokuapp.com/task?limit=2&skip=10";
    const config = headerAdding(token);

    return axios.get(taskPagination_url, config)
            .then(res => {
                return res.data
            })
            .catch(function (error) {
                console.log(error);
                return "error"
            })
}

export function deleteTask(token: string, id: string): any{
    const deleteTask_url = "https://api-nodejs-todolist.herokuapp.com/task/" + id;
    const config = headerAdding(token);

    return axios.delete(deleteTask_url, config)
            .then(res => {
                return {
                    status: res.data.success
                }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    status: false,
                    error: error
                }
            })
}


const headerAdding = (token: string) => {
    const config = {
        headers: { Authorization: "Bearer " + token }
    };

    return config;
}

const transferDataFormat = (response: ResData) => {
    const tempDescription = response.description;
    const dataPiece = tempDescription.split('||');

    if (dataPiece.length > 3){
        const tempData = {
            description: dataPiece[0],
            category: dataPiece[1],
            content: dataPiece[2],
            deadline: new Date(dataPiece[3]),
            id: response._id
        }
        return tempData
    } else {
        return {
            description: tempDescription,
            category: '',
            content: '',
            deadline: new Date(),
            id: response._id
        }
    }
}

const convertWholeArray = (response: ResData[]) => {
    let i = 1;
    const data = [transferDataFormat(response[0])];
    while(response[i]){
        data.push(transferDataFormat(response[i]));
        i++;
    }
    return data;
}