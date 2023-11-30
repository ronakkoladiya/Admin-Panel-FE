interface IProps {
  data?: any;
  itemsPerPage?: any;
  getcurrentdata?: any;
  count?: number;
  page?: number;
  getcurrentPage?: any;
  CurrentPagevalue?:any;
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  getlastindex?: any;
  sx?: any;
}

export type { IProps };
