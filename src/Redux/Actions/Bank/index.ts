import {GET_USER_BANKDETAILS,POST_USER_BANKDETAILS, PUT_USER_BANKDETAILS} from "./index.actionType";
import { SuccessActionCallback } from "../index.type";
import {ALL_PROJECT_NAME} from "../Report";

export const GetUserBankDetails = (id:string) => ({
    type: GET_USER_BANKDETAILS,
    axiosAction: true,
    method: 'GET',
    url: `bank?userId=${id}`,
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            bank : {
                ...state.bank,
                bankDetails: response
            }
        }
    }
})
export const PostBankDetails = (payload:any) => ({
    type: POST_USER_BANKDETAILS,
    axiosAction: true,
    method: 'POST',
    toaster : {
        success : true,
        error:true,
    },
    payload:payload,
    url: `bank`,
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        console.log(response);
        return {
            ...state,
        }
    }
})