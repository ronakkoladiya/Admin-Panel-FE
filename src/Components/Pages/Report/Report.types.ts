interface IProps {
  data?: any;
  columns?: any;
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
interface filterDataTypes {
  employee: string ;
  project: string ;
  startdate: string ;
  enddate: string ;
}

export type { IProps,stateHandlerTypes,dataTypes,filterDataTypes };
