import LoaderAndToaster from "./LoaderAndToaster";
import axios from "axios";

interface IAction {
    type: string;
    payload?: any;
    header?: any;
    method?: string;
    baseURL?: string;
    url?: string;
    axiosAction?: any;
    toaster?: any;
    loader?: boolean;
    onFetching?: Function;
    onSuccess?: Function;
    onFailed?: Function;
}

interface IAxiosProps {
    method: string;
    baseURL?: string;
    url?: string;
    payload: any;
    header: any;
}

const getAxiosProps = ({
                           method,
                           baseURL = process.env.REACT_APP_BACKEND_ORIGIN,
                           url,
                           payload,
                           header = {}
                       } : IAxiosProps) => ({
    method,
    baseURL,
    url,
    data: payload,
    headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...header,
    }
});

const axiosAction = ({getState} : any) => (next : any) => async (action : IAction) => {

    const {type, payload, header, method= "GET", baseURL, url, axiosAction, toaster = {}, loader = true, onSuccess, onFetching, onFailed} = action;
    const loaderAndToaster = new LoaderAndToaster({next, toaster, type, loader, payload, onSuccess, onFetching, onFailed});

    if (axiosAction) {

        try {
            await loaderAndToaster.loaderStart({loader});

            const response = await axios(getAxiosProps({
                method,
                baseURL,
                url,
                header,
                payload,
            }));

            await loaderAndToaster.toasterSuccess({response,method});
        } catch (axiosError) {
            await loaderAndToaster.toasterError({error: axiosError,method});
        } finally {
            await loaderAndToaster.loaderEnd({loader});
        }
    } else {
        await next(action);
    }

    return {
        store: getState(),
        action,
        response: loaderAndToaster.getResponse(),
    };

};

export {axiosAction};