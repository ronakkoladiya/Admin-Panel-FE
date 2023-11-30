import {REFRESH} from "./index.actionType";
import { IRefresh} from "./index.types";
import { SuccessActionCallback } from "../index.type";

export * from "./index.actionType"
export * from "./index.types"

export const RefreshApi = () => ({
    type: REFRESH,
    axiosAction: true,
    method: "Get",
    url: `refreshPage?token=${localStorage.getItem("token")}`,
    onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
        return {
            ...state,
            auth: {
                ...state.auth,
                userDetails :{
                    ...response,
                },
            },
        }
    }
});

