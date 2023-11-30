interface IReport{
    isReport:boolean
}

const report=()=>({
    isReport:false,
});

export {report};
export type{IReport}