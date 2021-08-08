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