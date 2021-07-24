import axios from "axios";
import { User, Login} from "../../interface/userInterface";

export function registerUser(user: User): any{
    const regist_url = "https://api-nodejs-todolist.herokuapp.com/user/register";
    return axios.post(regist_url, user)
            .then(response => {
                console.log(response + "this is response");
                return {
                    user: response.data.user,
                    token: response.data.token,
                };
            })
            .catch(function (error) {
                console.log(error);
                return "error"
            })
}

export function loginUserByEmail(loginDetail: Login): any{
    const login_url = "https://api-nodejs-todolist.herokuapp.com/user/login";
    return axios.post(login_url, loginDetail)
            .then(response => {
                console.log(response);
                if(response.data === "Unable to login"){
                    return "Unable to login"
                } else{
                    return {
                        token: response.data.token,
                        user: response.data.user,
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
                return "error"
            })
}

export function getUserDetailByToken(token: string): any{
    const login_url = "https://api-nodejs-todolist.herokuapp.com/user/me";
    const config = {
        headers: { Authorization: "Bearer " + token }
    };

    return axios.get(login_url, config)
            .then(response => {
                return {
                    name: response.data.name,
                    age: response.data.age,
                    email: response.data.email,
                }

            })
            .catch(function (error) {
                console.log(error);
                return "error"
            })
}

export function loggout(token: string): any{
    const loggout_url = "https://api-nodejs-todolist.herokuapp.com/user/logout";
    const config = {
        headers: { Authorization: "Bearer " + token }
    };
    console.log(config)
    return axios.post(loggout_url, {}, config)
            .then(response => {
                console.log(response);
                return response.data.success
            })
            .catch(function (error) {
                console.log(error);
                return false
            })
}

export function updateProfile(user: User, token: string){
    const update_url = "https://api-nodejs-todolist.herokuapp.com/user/me";

    const config = {
        headers: { Authorization: "Bearer " + token }
    };

    return axios.put(update_url, user, config)
    .then(res => {
        return res.data.success
    })
    .catch(function (error) {
        console.log(error);
        return false
    })


}