export interface InfoObj{
    description: string,
    category: string,
    content: string,
    deadline: Date,
    id: string
}

export interface ResData{
    description: string,
    _id: string,
}

export const DefaultInfo: InfoObj = {
    description: '',
    category: 'css',
    content: '',
    deadline: new Date(),
    id: ''
}
