import { UPDATE_LEAVE_STATUS, LEAVE_Add_DETAILS,LEAVE_ALL_LIST } from "./index.actionType"
import { ILeaveDetails } from './index.types';
import { SuccessActionCallback } from "../index.type";

export * from './index.actionType'
export * from './index.types'

export const GetAllLeaveApi = () => ({
    type: LEAVE_ALL_LIST,
    axiosAction: true,
    method: 'GET', 
    url : `leave`,
    toaster: {
        success : false,
        error:true,
    },
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            leave : {
                ...state.leave,
                list: response.data
            }
        }
    }
})

export const LeaveAddApi = (payload: any) => ({
    type: LEAVE_Add_DETAILS,
    axiosAction: true,
    payload,
    toaster: {
        success : true,
        error : true,
    },
    method: 'POST',
    url: 'leave',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            leave: {
                ...state.leave,
                isSubmit:true
            }
        }
    }
});

export const UpdateStatusApi = (payload: any) => ({
    type: UPDATE_LEAVE_STATUS,
    axiosAction: true,
    payload,
    toaster: {
        success : true,
        error : true,
    },
    method: 'PUT',
    url: `leave?_id=${payload.leaveId}`,
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            leave: {
                ...state.leave,
                isSubmit:true
            }
        }
    }
});