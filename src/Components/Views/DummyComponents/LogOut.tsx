import Button from "../Button/Button";
import {SuccessActionCallback} from "../../../Redux/Actions/index.type";


export default ({navigate,dispatch} : any) =>(<div>
    <Button 
        text="LogOut"
        sx={{marginTop: '100%', color: '#000981', border: '2px solid #000981', borderRadius: '40px'}}
        onClick={() => {
            dispatch(({
                type:'LOG_OUT_SUCCESS',
                callback: ({ state, payload, response }: SuccessActionCallback) => {
                localStorage.clear();
                return {
                    ...state,
                    auth: {
                        ...state.auth,
                        userDetails :{},
                        isLogged: false,
                    },
                }
            }}))
            navigate('/login');
        }}
    />
</div>)