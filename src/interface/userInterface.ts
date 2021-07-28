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


export interface userContext{
    token: string,
    setToken: (e: string) => void,
}