interface IToasterStart {
    toaster : boolean;
    message : string;
    type : string;

}

interface IToasterStop {
    
}

export type { IToasterStart, IToasterStop };