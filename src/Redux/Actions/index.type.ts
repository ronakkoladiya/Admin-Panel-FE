interface SuccessActionCallback {
    state : any;
    response? :any;
    payload? : any;
}

interface FailedActionCallback {
    state : any;
    response? :any;
    payload? : any;
}

export type {
    SuccessActionCallback,
    FailedActionCallback,
}