import axios from "axios";

export function addTask(token: string, detail: string): any{
    const addTask_url = "https://api-nodejs-todolist.herokuapp.com/task";
    const config = {
        headers: { Authorization: "Bearer " + token }
    };

    return axios.post(addTask_url, detail, config)
            .then(res => {
                return res.data
            })
            .catch(function (error) {
                console.log(error);
                return "error"
            })
}

export function getAllTask(token: string): any{
    const getAllTask_url = "https://api-nodejs-todolist.herokuapp.com/task";
    const config = {
        headers: { Authorization: "Bearer " + token }
    };

    return axios.get(getAllTask_url, config)
            .then(res => {
                return res.data
            })
            .catch(function (error) {
                console.log(error);
                return "error"
            })
}

export function getOneTask(token: string, id: string): any{
    const getOneTask_url = "https://api-nodejs-todolist.herokuapp.com/task/" + id ;
    const config = {
        headers: { Authorization: "Bearer " + token }
    };

    return axios.get(getOneTask_url, config)
            .then(res => {
                return res.data
            })
            .catch(function (error) {
                console.log(error);
                return "error"
            })
}

export function getTaskByPagination(token: string): any{
    const taskPagination_url = "https://api-nodejs-todolist.herokuapp.com/task?limit=2&skip=10";
    const config = {
        headers: { Authorization: "Bearer " + token }
    };

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
    const config = {
        headers: { Authorization: "Bearer " + token }
    };

    return axios.delete(deleteTask_url, config)
            .then(res => {
                return res.data
            })
            .catch(function (error) {
                console.log(error);
                return "error"
            })
}
