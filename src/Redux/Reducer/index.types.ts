interface IAction {
    type: string;
    payload?: any;
    response?: any;
    callback?: Function;
}

export type { IAction };