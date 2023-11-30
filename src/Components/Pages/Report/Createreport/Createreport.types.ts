interface IProps {
}

interface projectTypes{

    projectId: string;
    hours: number | string;
    minutes: number | string;
    description: string;
}

interface allreportdataTypes {
    reportDate: string;
    employeeId:string;
    project: projectTypes[];
}
interface errorsTypes {
    reportDate: string;
    employeeId:string;
    projectData: projectTypes[];
}

interface AllProjectNameDetailsTypes{
    projectName: string;
    _id: string;
}
export type { IProps,allreportdataTypes,projectTypes ,errorsTypes,AllProjectNameDetailsTypes};
