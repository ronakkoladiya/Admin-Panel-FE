interface ILogin {
    email: string;
    password: string;
}
interface IForget {
    email: string;
}
interface INewPassword {
    password: string;
    confirmPassword:string
}
export type { IForget,ILogin,INewPassword};