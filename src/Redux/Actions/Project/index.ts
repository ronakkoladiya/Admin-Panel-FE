import {GET_PROJECT_LIST, POST_PROJECT_LIST, USER_BY_DESIGNATION, GET_TECHNOLOGY} from "./index.actionType";
import { SuccessActionCallback } from "../index.type";

export * from "./index.actionType";

export const ProjectApi = () => ({
    type: GET_PROJECT_LIST,
    axiosAction: true,
    method: 'GET',
    url: 'project',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            project: {
                ...state.project,
                list: response
            }
        }
    }
})

export const ProjectPostApi = (payload: any) => ({
    type: POST_PROJECT_LIST,
    axiosAction: true,
    payload,
    toaster : {
        success : true,
        error:true,
    },
    method: 'POST',
    url: 'project',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        console.log({ state, payload, response });
        return {
            ...state,
            project: {
                ...state.project,
                isSubmit:true
            }
        }
    }
})

export const GetUserByDesignation = () => ({
    type: USER_BY_DESIGNATION,
    axiosAction: true,
    method: 'GET',
    url: 'getUserByDesignation',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            userByDesignation : {
                ...state.userByDesignation,
                list: response
            }
        }
    }
})


export const GetTechnologyApi = () => ({
    type: GET_TECHNOLOGY,
    axiosAction: true,
    method: 'GET',
    url: 'technology',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            technology : {
                ...state.technology,
                list: response.data
            }
        }
    }
})
