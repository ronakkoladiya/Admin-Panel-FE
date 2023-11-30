import { Login, Forget, EmailCheck, NewPasswordData } from "../Components";
import { Dashboard } from "../Components/Pages/Dashboard";
import { Overall } from "../Components/Pages/Branch/Overall";
import { Report } from "../Components/Pages/Report";
import { Attendance } from "../Components/Pages/Attendance";
import { Branch } from '../Components/Pages/Branch';
import { Holiday } from "../Components/Pages/Holiday";
import { List } from "../Components/Pages/Branch/List"
import { Layout } from "../Components/Layout";
import { Manage_Employee } from "../Components/Pages/Employee/Manage_Employee";
import EmployeeList from "../Components/Pages/Employee/EmployeesList";
import { Overalldeshbord } from "../Components/Pages/Dashboard/Overall";
import { LeaveEmployee } from "../Components/Pages/Dashboard/Leave_Employee";
import { NewEmployee } from "../Components/Pages/Dashboard/New_Employee";
import {DashboardHoliday} from "../Components/Pages/Dashboard/DashboardHoliday";
import Views from "../Components/Views";
import {Project} from "../Components/Pages/Project";
import Createreport from "../Components/Pages/Report/Createreport/Createreport";
import {ShowProject} from "../Components/Pages/Project/Showproject";
import {CreateProject} from "../Components/Pages/Project/Createproject";
import {AddEmployee} from "../Components/Pages/Dashboard/Add_Employee";
import { Leave } from "../Components/Pages/Leave";
import CreateLeave from "../Components/Pages/Leave/CreateLeave/CreateLeave";
import {Manage} from "../Components/Pages/Manage";

// set "userAccess" in src/Redux/Initialstate/Auth/index.ts

export const ROUTE_LIST = () => [
    {
        name: 'Login',
        path: '/login',
        element: Login,
        userAccess: ["admin","employee"],
        authRequired: false
    },
    {
        name: 'Forget',
        path: '/forget',
        element: Forget,
        userAccess: ["admin","employee"],
        authRequired: false
    },
    {
        name: 'Email',
        path: '/emailCheck',
        element: EmailCheck,
        userAccess: ["admin","employee"],
        authRequired: false
    },
    {
        name: 'NewPassword',
        path: '/newPassword',
        element: NewPasswordData,
        userAccess: ["admin","employee"],
        authRequired: false
    },
    //temporary for common components
    {
        name: 'Views',
        path: '/views',
        element: Views,
        userAccess: ["admin","employee"],
        authRequired: true,
    },
    //temporary for common components
    {
        name: 'Layout',
        path: '/',
        element: Layout,
        userAccess: ["admin","employee"],
        authRequired: true,
        children: [
            {
                name: 'Sidebar',
                path: '',
                element: Dashboard,
                userAccess: ["admin"],
                authRequired: false,
                children: [
                    {
                        name: 'BranchList',
                        path: 'overall',
                        element: Overalldeshbord,
                        userAccess: ["admin"],
                        authRequired: false
                    },
                    {
                        name: 'Sidebar',
                        path: 'employee',
                        element: EmployeeList,
                        userAccess: ["admin"],
                        authRequired: false,
                    },
                    {
                        name: 'Sidebar',
                        path: 'employee/:id',
                        element: Manage_Employee,
                        userAccess: ["admin"],
                        authRequired: false,
                    },
                    {
                        name: 'BranchList',
                        path: 'leave-employee',
                        element: LeaveEmployee,
                        userAccess: ["admin"],
                        authRequired: false
                    },
                    {
                        name: 'BranchList',
                        path: 'new-employee',
                        element: NewEmployee,
                        userAccess: ["admin"],
                        authRequired: false
                    },
                    {
                        name: 'BranchList',
                        path: 'new-employee/add-employee',
                        element: AddEmployee,
                        userAccess: ["admin"],
                        authRequired: false
                    },
                    {
                        name: 'BranchList',
                        path: 'holiday',
                        element: DashboardHoliday,
                        userAccess: ["admin"],
                        authRequired: false
                    }
                ]
            },
            {
                name: 'BranchList',
                path: 'manage',
                element: Manage,
                userAccess: ["admin"],
                authRequired: false
            },
            {
                name: 'Sidebar',
                path: '',
                element: Manage_Employee,
                userAccess: ["employee"],
                authRequired: false,
            },
            {
                name: 'Sidebar',
                path: 'employee/:id',
                element: Manage_Employee,
                userAccess: ["employee"],
                authRequired: false,
            },
            {
                name: 'Sidebar',
                path: 'branch',
                element: Branch,
                userAccess: ["admin"],
                authRequired: false,
                children: [
                    {
                        name: 'BranchList',
                        path: 'overall',
                        element: Overall,
                        userAccess: ["admin"],
                        authRequired: false
                    },
                    {
                        name: 'BranchList',
                        path: 'list',
                        element: List,
                        userAccess: ["admin"],
                        authRequired: false
                    }
                ]
            },
            {
                name: 'Sidebar',
                path: 'report',
                element: Report,
                userAccess: ["admin","employee"],
                authRequired: false
            },
            {
                name: 'Sidebar',
                path: 'attendance',
                element: Attendance,
                userAccess: ["admin"],
                authRequired: false
            },
            {
                name: 'CreateReport',
                path: 'report/createreport',
                element: Createreport,
                userAccess: ["employee"],
                authRequired: false
            },
            {
                name: 'Sidebar',
                path: 'leave',
                element: Leave,
                userAccess: ["employee"],
                authRequired: false
            },
            {
                name: 'CreateLeave',
                path: 'leave/createleave',
                element: CreateLeave,
                userAccess: ["employee"],
                authRequired: false
            },
            {
                name: 'Sidebar',
                path: 'project',
                element: Project,
                userAccess: ["admin"],
                authRequired: false,
                children: [
                    {
                        name: 'BranchList',
                        path: 'showproject',
                        element: ShowProject,
                        userAccess: ["admin"],
                        authRequired: false
                    },
                    {
                        name: 'BranchList',
                        path: 'createproject',
                        element: CreateProject,
                        userAccess: ["admin"],
                        authRequired: false
                    }
                ]
            },
            {
                name: 'Sidebar',
                path: 'holiday',
                element: Holiday,
                userAccess: ["employee"],
                authRequired: false
            }
        ]
    }
].filter(({ authRequired }) => localStorage.getItem('token') ? authRequired : !authRequired);