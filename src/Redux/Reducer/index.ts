import {IAction} from "./index.types";

const reducer = (state: any, {type, response, payload, callback}: IAction) => {
    if (type.includes("_FETCHING")) {
        return callback?.({
            state,
            response,
            payload
        }) || state
    } else if (type.includes("_FAILED")) {
        return callback?.({
            state,
            response,
            payload
        }) || state
    } else if (type.includes("_SUCCESS")) {
        return callback?.({
            state,
            response,
            payload
        }) || state
    } else if (type.includes("LOADER_")) {
        return callback?.({
            state,
            response,
            payload
        }) || state
    }else if (type.includes("TOASTER_")) {
        return callback?.({
            state,
            response,
            payload
        }) || state
    } else if (type.includes("_ERROR")) {
        return callback?.({
            state,
            response,
            payload
        }) || state
    }else  {
        return state
    }
};

export {reducer};