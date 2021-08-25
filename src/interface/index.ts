export * from './todoInterface';
export * from './userInterface';

export enum  NoteType {
    success = 'success',
    failure = 'error',
    information = 'info',
}

export interface NoteDetail {
    type: NoteType,
    message: string,
}

export const DefaultNote = {
    type: NoteType.success,
    message: 'this is a note'
}