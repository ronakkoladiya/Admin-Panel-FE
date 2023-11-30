import {ADD_TECHNOLOGY, DELETE_TECHNOLOGY} from "./index.actionType";
import {SuccessActionCallback} from "../../index.type";
import {EMPLOYEE_LIST} from "../../Emplyoee";

export const AddTechnology = (payload: any) => ({
    type: ADD_TECHNOLOGY,
    axiosAction: true,
    method: 'POST',
    toaster : {
        success : true,
        error:true,
    },
    payload,
    url: 'technology',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
        }
    }
})

export const DeleteTechnology = (id: string) => ({
    type: DELETE_TECHNOLOGY,
    axiosAction: true,
    method: 'DELETE',
    toaster : {
        success : true,
        error:true,
    },
    url: `technology?id=${id}`,
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
        }
    }
})