import { EMPLOYEE_LIST, EMPLOYEE_DETAILS, ADD_EMPLOYEE, GET_DESIGNATION, GET_BRANCH_LIST, UPDATE_EMPLOYEE, GET_USER_BY_DESIGNATION_ID } from "./index.actionType"
import { IEmployeeDetails, IEmployeeList } from './index.types';
import { SuccessActionCallback } from "../index.type";

export * from './index.actionType'
export * from './index.types'

export const EmployeeApi = () => ({
    type: EMPLOYEE_LIST,
    axiosAction: true,
    method: 'GET',
    url: 'user',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            employee : {
                ...state.employee,
                list: response.data
            }
        }
    }
})

export const AddEmployeeApi = (payload: any) => ({
    type: ADD_EMPLOYEE,
    axiosAction: true,
    method: 'POST',
    toaster : {
        success : true,
        error:true,
    },
    payload,
    url: 'user',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            employee : {
                ...state.employee,
                isSubmit: true
            }
        }
    }
})

export const UpdateEmployeeApi = (payload: any,id: any) => ({
    type: UPDATE_EMPLOYEE,
    axiosAction: true,
    method: 'PUT',
    toaster : {
        success : true,
        error:true,
    },
    payload,
    url: `user?id=${id}`,
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            employee : {
                ...state.employee,
                isSubmit: true
            }
        }
    }
})

export const EmployeeApiById = (payload: IEmployeeDetails) => ({
    type: EMPLOYEE_DETAILS,
    axiosAction: true,
    method: 'GET',
    url: `user?_id=${payload.id}`,
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {

        return {
            ...state,
            employee : {
                ...state.employee,
                detail: {
                    ...state?.detail,
                    ...((response.data || []).reduce((acc: any, cur: any) => ({
                        ...acc,
                        [cur._id]: cur
                    }), {}))
                }
            }
        }
    }
})

export const GetDesignationApi = () => ({
    type: GET_DESIGNATION,
    axiosAction: true,
    method: 'GET',
    url: 'designation',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            designation : {
                ...state.designation,
                list: response.data
            }
        }
    }
})

export const GetBranchApi = () => ({
    type: GET_BRANCH_LIST,
    axiosAction: true,
    method: 'GET',
    url: 'branch',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            branch: {
                ...state.branch,
                list: response
            }
        }
    }
})

export const GetUserByDesignationID = (id:any) => ({
    type: GET_USER_BY_DESIGNATION_ID,
    axiosAction: true,
    method: 'GET',
    url: `user?designation=${id}`,
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            employee : {
                ...state.employee,
                list: response.data
            }
        }
    }
})