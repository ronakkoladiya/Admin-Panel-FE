import {LOADER_START, LOADER_STOP} from "./index.actionType";
import {ILoaderStart, ILoaderStop} from "./index.types";
import {SuccessActionCallback} from "../index.type";

export * from "./index.actionType";
export * from "./index.types";

export const loaderStart = ({id,loader} : ILoaderStart) => ({
    type: LOADER_START,
    payload: {id,loader},
    callback: ({ state, payload }: SuccessActionCallback) => {
        return loader ? {
            ...state,
            commonLoader : {
                ...state.commonLoader,
                loaderId : [...state.commonLoader.loaderId,id],
                loading : true
            }
        } : state
    }
});

export const loaderStop = ({id,loader} : ILoaderStop) => ({
    type: LOADER_STOP,
    payload: {id,loader},
    callback: ({ state, payload }: SuccessActionCallback) => {
        return loader ? {
            ...state,
            commonLoader : {
                ...state.commonLoader,
                loaderId : [...state.commonLoader.loaderId].filter( loaderId => loaderId !== id),
                loading : ([...state.commonLoader.loaderId].filter( loaderId => loaderId !== id).length > 0) ? true : false
            }
        } : state
    }
});
