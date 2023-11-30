import { auth, IAuth } from './Auth';
import { branch, IBranch } from './Branch';
import { employee, IEmployee } from './Emplyoe';
import { commonLoader, ICommonLoader } from './CommonLoader';



const initialState = () => ({
    auth: auth(),
    branch: branch(),
    employee: employee(),
    commonLoader : commonLoader(),
   
});

export {
    initialState,
    auth,
    branch,
    employee,
    commonLoader,
   
};

export type {
    IAuth
}
export type {
    IBranch
}
export type {
    IEmployee
}
export type {
    ICommonLoader
}