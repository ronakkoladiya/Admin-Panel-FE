const paths = {
    dashboard: '/dashboard',
    profile: '/profile',
    branch: '/branch',
    project: '/project',
    employee: '/employee',
    newEmployee: '/new-employee',
    addEmployee: '/add-employee'
};

const userRoleConst = {
    admin: 'admin',
    employee: 'employee',
};

const label = {
    chartData: {
        chartWeekLabel: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        chartMonthLabel: ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Now', 'Oct'],
    }
};

const fakeData = {
    chartData: {
        newEmployer: [9, 4, 6, 4, 5, 6, 7, 4, 1, 8, 4, 3],
        leaveEmployer: [9, 4, 6, 9, 5, 6, 2]
    }
};

const routes = {
    sidebarAdminRoutes: [
        {
            label: 'Dashboard',
            path: '/'
        },
        {
            label: 'Branch',
            path: '/branch'
        },
        {
            label: 'Attendance',
            path: '/attendance'
        },
        {
            label: 'Project',
            path: '/project'
        },
        {
            label: 'Report',
            path: '/report'
        },
        {
            label: 'Manage',
            path: '/manage'
        },
    ],
    menuDashboard: [
        {
            p: 'Overall',
            path: 'overall',
        },
        {
            p: 'Employee',
            path: 'employee',
        },
        {
            p: 'Leave Employee',
            path: 'leave-employee',
        },
        {
            p: 'New Employee',
            path: 'new-employee',
        },
        {
            p: 'Holiday',
            path: 'holiday',
        },
    ],
    menuBranch: [
        {
            p: 'Overall',
            path: 'overall'
        },
        {
            p: 'Branch List',
            path: 'list'
        }
    ],
    menuProject: [
        {
            p: 'Project',
            path: 'showproject'
        },
        {
            p: 'Create Project',
            path: 'createproject'
        }
    ],
}

export {paths, userRoleConst, label, fakeData, routes};