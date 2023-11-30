import {axiosAction} from "./axiosAction";

const middleware = (getDefaultMiddleware : Function) => getDefaultMiddleware({serializableCheck: false}).concat([axiosAction]);

export {middleware};