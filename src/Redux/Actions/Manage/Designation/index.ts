import {ADD_DESIGNATION, DELETE_DESIGNATION,GET_DESIGNATION} from "./index.actionType";
import {SuccessActionCallback} from "../../index.type";


export const AddDesignation = (payload: any) => ({
    type: ADD_DESIGNATION,
    axiosAction: true,
    method: 'POST',
    toaster : {
        success : true,
        error:true,
    },
    payload,
    url: 'designation',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
        }
    }
})
export const GetAllDesignation = () => ({
    type: GET_DESIGNATION,
    axiosAction: true,
    method: 'GET',
    url: 'designation',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            designation: {
                ...state.designation,
                list: response.data
            }
        }
    }
})
export const DeleteDesignation = (id: any) => ({
    type: DELETE_DESIGNATION,
    axiosAction: true,
    method: 'DELETE',
    toaster : {
        success : true,
        error:true,
    },
    url: `designation?id=${id}`,
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
        }
    }
})