import axios from "axios";
import { User, Login} from "../../interface/userInterface";

export function registerUser(user: User): any{
    const register_url = "https://api-nodejs-todolist.herokuapp.com/user/register";
    return postRequest(register_url, user);
}

export function loginUserByEmail(loginDetail: Login): any{
    const login_url = "https://api-nodejs-todolist.herokuapp.com/user/login";
    return postRequest(login_url, loginDetail)
}

export function getUserDetailByToken(token: string): any{
    const login_url = "https://api-nodejs-todolist.herokuapp.com/user/me";
    const config = headerAdding(token);

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
                return {
                    status: false,
                    error: error
                }
            })
}

export function loggout(token: string): any{
    const loggout_url = "https://api-nodejs-todolist.herokuapp.com/user/logout";
    const config = headerAdding(token);
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

    const config = headerAdding(token);

    return axios.put(update_url, user, config)
    .then(res => {
        return res.data.success
    })
    .catch(function (error) {
        console.log(error);
        return false
    })
}


const headerAdding = (token: string) => {
    const config = {
        headers: { Authorization: "Bearer " + token }
    };

    return config;
}

const postRequest = (url: string, payLoad: object) => {
    return axios.post(url, payLoad)
    .then(response => {
        console.log(response);
        return {
            status: true,
            user: response.data.user,
            token: response.data.token,
        };
    })
    .catch(function (error) {
        console.log(error);
        return {
            status: false,
            error: error
        }
    })
}