import { REPORT_LIST, REPORT_Add_DETAILS,ALL_EMPLOYEE_NAME,ALL_PROJECT_NAME,REPORT_ALL_LIST } from "./index.actionType"
import { IReportDetails } from './index.types';
import { SuccessActionCallback } from "../index.type";

export * from './index.actionType'
export * from './index.types'

export const GetReportApiByid = (payload:IReportDetails) => ({
    type: REPORT_LIST,
    axiosAction: true,
    payload:payload,
    method: 'GET', 
    url : `getEmployeeReport${payload ? "?employeeId=" + payload : ""}`,
    onFailed :({ state, payload, response }: SuccessActionCallback) => {
      
        return {
            ...state,
            report : {
                ...state.report,
                list: [] ,
            }
        }
    },
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => { 
        return {
            ...state,
            report : {
                ...state.report,
                list: response ,
            }
        }
    }
})
export const GetAllReportApi = () => ({
    type: REPORT_ALL_LIST,
    axiosAction: true,
    method: 'GET', 
    url : `getEmployeeReport`,

    onFailed :({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            report : {
                ...state.report,
                list: [] ,
            }
        }
    },
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            report : {
                ...state.report,
                list: response
            }
        }
    }
})
export const GetAllProjectNameApi = () => ({
    type: ALL_PROJECT_NAME,
    axiosAction: true,
    method: 'GET',
    url: 'getAllProjectName',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            report : {
                ...state.report,
                projectname: response
            }
        }
    }
})

export const GetAllEmployeeNameApi = () => ({
    type: ALL_EMPLOYEE_NAME,
    axiosAction: true,
    method: 'GET',
    url: 'getUserByDesignation',
    
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            report : {
                ...state.report,
                employeename: response
            }
        }
    }
})


export const ReportAddApi = (payload: any) => ({
    type: REPORT_Add_DETAILS,
    axiosAction: true,
    payload,
    toaster: {
        success : true,
        error:true,
    },
    method: 'POST',
    url: 'createReport',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            report: {
                ...state.report,
                isSubmit:true
            }
        }
    }
});
