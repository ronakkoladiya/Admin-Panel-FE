interface IBranch {
    isList: boolean;
}

const branch = () => ({
    isList: false,
});

export {branch};
export type{ IBranch };