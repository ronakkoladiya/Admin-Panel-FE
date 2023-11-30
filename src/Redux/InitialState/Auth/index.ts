interface IAuth {
    isLogged: boolean;
}

const auth = () => ({
    isLogged: false
});

export {auth};
export type { IAuth };
