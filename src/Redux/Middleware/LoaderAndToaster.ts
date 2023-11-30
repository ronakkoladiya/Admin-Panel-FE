import toast from "react-hot-toast";

import {loaderStart, loaderStop} from "../Actions";
import { toasterStart, toasterStop } from "../Actions/Toaster";

interface ILoaderAndToaster {
    next: any;
    toaster: any;
    type: string;
    loader: boolean;
    payload?: any;
    onSuccess?: Function;
    onFailed?: Function;
    onFetching?: Function;
}

const isString = (value: any) => typeof value === 'string';

const TOASTER_OBJECT = {
    loading: null,
    success: false,
    error: false,
};

class LoaderAndToaster {

    private readonly loaderId: any;
    private readonly loader: boolean;
    private readonly loading: any;
    private readonly success: any;
    private readonly error: any;
    private readonly next: any;
    private readonly payload: any;
    private readonly type: string;
    private readonly onSuccess?: Function;
    private readonly onFailed?: Function;
    private readonly onFetching?: Function;


    private response: any;

    constructor({next, toaster, type, loader, payload, onSuccess, onFailed, onFetching}: ILoaderAndToaster) {

        const {
            loading = TOASTER_OBJECT.loading,
            success = TOASTER_OBJECT.success,
            error = TOASTER_OBJECT.error
        } = toaster;

        this.loaderId = Number.randomId();
        this.loader = loader;
        this.loading = loading;
        this.success = success;
        this.error = error;
        this.next = next;
        this.type = type;
        this.response = null;
        this.payload = payload;
        this.onSuccess = onSuccess;
        this.onFailed = onFailed;
        this.onFetching = onFetching;
        return this;
    };

    loaderStart = async ({loader} : any) => {
        if (this.loader)
            this.next(loaderStart({id: this.loaderId,loader}));
        if (isString(this.loading))
            toast.loading(this.loading, {
                id: this.loaderId,
            });
        await this.next({
            type: `${this.type}_FETCHING`,
            payload: this.payload,
            callback: this.onFetching
        });
    };

    toasterSuccess = async ({response,method}: any) => {
        this.response = response;
        if (this.success){
            toast.success(isString(this.success) ? this.success : response.data.message, {id: this.loaderId});
            await this.next(toasterStart({type:"success",toaster:true,message: this.loading || response.data.message||"Success"}));
        }else
            toast.dismiss(this.loaderId);
        
        await this.next({
            type: `${this.type}_SUCCESS`,
            response: response.data,
            payload: this.payload,
            callback: this.onSuccess
        });
    };

    toasterError = async ({error,method}: any) => {
        this.response = error;
        if (this.error){
            toast.error((isString(this.error) ? this.error : error?.response?.data?.error) || 'Something went to wrong !', {id: this.loaderId});
             await this.next(toasterStart({type:"error",toaster:true,message: error?.response?.data?.error || 'Something went to wrong !'}));
        }else
            toast.dismiss(this.loaderId);
        await this.next({
            type: `${this.type}_ERROR`,
            response: error,
            payload: this.payload,
            callback: this.onFailed
        });
    };

    loaderEnd = async ({loader} : any) => {
        if (this.loader)
            await this.next(loaderStop({id: this.loaderId, loader}));
           
            
    };

    getResponse = () => this.response;

}

export default LoaderAndToaster;