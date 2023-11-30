import {LOGIN, FORGET, NEW_PASSWORD} from "./index.actionType";
import { IAuth } from "../../InitialState";
import { ILogin, IForget, INewPassword } from "./index.types";
import { SuccessActionCallback, FailedActionCallback } from "../index.type";
import {IBranchList} from "../Branch/index.types";
import {BRANCH_LIST} from "../Branch";

export * from "./index.actionType"
export * from "./index.types"

export const LoginApi = (payload: ILogin) => ({
    type: LOGIN,
    axiosAction: true,
    payload,
    toaster : {
        success : true,
        error:true,
    },
    method: "POST",
    url: "auth/login",
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        const token = response.user.token;
        console.log({ state, payload, response });
        localStorage.setItem("token", token);
        return {
            ...state,
            auth: {
                ...state.auth,
                userDetails :{
                    ...response.user.userDetails,
                },
                successMessage: response.message,

                isLogged: true,
            },
        }
    },
    onFailed: ({ state, payload, response }: FailedActionCallback) => {
        return {
            ...state,
            auth: {
                ...state.auth,
                errorMessage: response.response.data.error,
            },
        }
    },
});

export const ForgetPassword = (payload: IForget) => ({
    type: FORGET,
    axiosAction: true,
    payload,
    toaster : {
        success : true,
        error:true,
    },
    method: "POST",
    url: "auth/forgot_password",
    onSuccess: (state: IAuth) => {
        console.log({ state, payload });
        return {
            ...state,
            isLogged: true,
        }
    }
});

export const NewPasswordRedux = (payload: INewPassword) => ({
    type: NEW_PASSWORD,
    axiosAction: true,
    payload,
    toaster : {
        success : true,
        error:true,
    },
    method: "POST",
    url: "auth/reset_password",
    onSuccess: (state: IAuth) => {
        return {
            ...state,
            isLogged: true,
        }
    }
});



