import {configureStore} from "@reduxjs/toolkit";
import {initialState} from "./InitialState";
import {reducer} from "./Reducer";
import {middleware} from "./Middleware";

const store = configureStore({
    reducer: reducer,
    preloadedState: initialState(),
    middleware
});

export default store;
