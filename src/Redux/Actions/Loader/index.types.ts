interface ILoaderStart {
    id : string;
    loader : boolean
}

interface ILoaderStop {
    id : string;
    loader : boolean
}

export type { ILoaderStart, ILoaderStop };