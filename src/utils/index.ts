import { InfoObj } from '../interface';

export * from './task/taskApiService';
export * from './user/TodoApiService';

export const redirectToHome = () => {
    window.location.href = '/';
}

export const  dateToNum = (d) => {
    var time = d.toLocaleDateString()
    time = time.split("/"); 
    return Number(time[0]+time[1]+time[2]);
}

export const checkPass = (password: string) => {
    return password.length > 7;
}

export const saveTokenToLocal = (token: string) => {
    localStorage.setItem('token', token);
}

export const removeTokenFromLocal = () => {
    localStorage.removeItem("token");
}

export const calculatorPageNum = (length: number) => {
   const num = length % 10 === 0 ? Math.floor(length/10) : Math.floor(length/10)+1;
   return num
}

export const cutDisplayData = (data: InfoObj[], activeNum: number) => {
    let leftBoundry = (activeNum - 1) * 10;
    let rightBoundry = activeNum * 10;

    rightBoundry = rightBoundry > data.length ? data.length : rightBoundry;

    return data.slice(leftBoundry, rightBoundry)
}