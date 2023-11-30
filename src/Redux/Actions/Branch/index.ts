import { BRANCH_LIST } from "./index.actionType";
import { IBranchList } from "./index.types";
// import { IBranch } from "../../InitialState";
import { SuccessActionCallback } from "../index.type";

export * from './index.actionType'
export * from './index.types'

export const BranchApi = (payload: IBranchList) => ({
    type: BRANCH_LIST,
    axiosAction: true,
    payload,
    method: 'GET',
    url: 'branch',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state
        }
    }
});

export const BranchAddApi = (payload: IBranchList) => ({
    type: BRANCH_LIST,
    axiosAction: true,
    payload,
    toaster : {
        success : true,
        error:true,
    },
    method: 'POST',
    url: 'branch',
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            branch: {
                ...state.branch,
                isSubmit:true
            }
        }
    }
});