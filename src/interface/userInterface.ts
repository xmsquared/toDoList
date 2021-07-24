export interface User{
    name: string,
    email: string,
    password: string,
    age: number
}

export interface Login{
    email: string,
    password: string
}


export interface User_context{
    token: string,
    setToken: (e: any) => void,
}