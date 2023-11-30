interface TableProps {
    columns?:any,
    data?:any,
    tablesx?:object,
    tableheadsx?:object,
    tablebodysx?:object,
    tablerowsx?:object,
    tablecellsx?:object,
    oddcolor?:string,
    evencolor?:string,
    tablebodyheader?:any,
    withindex?:boolean,
    pagination?:boolean,
    itemsPerPage?:number,
  }
  interface stateHandlerTypes{
    name:string;
    value:string | number;
  }
  interface dataTypes  {
    employeeId: string;
    id: string;
    reportdate: string;
    project: string;
    task: string;
    hours: string;
    status: string;
    actions: string;
  };
  export type { TableProps,stateHandlerTypes,dataTypes};