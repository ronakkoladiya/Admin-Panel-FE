interface IEmployeeList{
    _id:any;
    firstName:string;
    middleName:string;
    lastName:string;
    designation:string;
    branch:string
}

interface IEmployeeDetails {
    id:string;
}
export type {IEmployeeList , IEmployeeDetails}