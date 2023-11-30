interface ICommonLoader{
    loading:boolean,
    loaderId : any
}

const commonLoader=()=>({
    loading:false,
    loaderId : []
});

export {commonLoader};
export type{ICommonLoader}