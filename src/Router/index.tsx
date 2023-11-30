import {useEffect, useMemo, useState} from "react";
import {Navigate, Route, Routes, useLocation, /*useLocation*/} from "react-router-dom";

import {ROUTE_LIST} from "./index.utiles";
import {RouteObject, State} from "./index.types";
import {useDispatch, useSelector} from "react-redux";
import {paths, userRoleConst} from "../Utiles/constant";
import { RefreshApi } from "../Redux/Actions/Refresh";
import Tools from "../Components/Pages/Tools/Tools";

const INITIAL_STATE = () => ({
    routeList: ROUTE_LIST(),
});

const Router = () => {

    const dispatch = useDispatch()
    const location = useLocation();
    const [state, setState] = useState<State>(INITIAL_STATE());
    const isLogged = useSelector((state: any) => state.auth.isLogged);
    const userRole = useSelector((state: any) => state?.auth?.userDetails?.userType);
    const userId = useSelector((state: any) => state?.auth?.userDetails?._id);

    const getRoutes = (route: RouteObject[]) => route.filter((component) => userRole ? component.userAccess.includes(userRole) : true).map(({
                                                               path,
                                                               element: Element,
                                                               children = []
                                                           }: RouteObject, i: number) => <Route path={path}
                                                                                                element={<Element/>}
                                                                                                key={i}>
        {getRoutes(children)}
    </Route>);

    const routes = useMemo(() => getRoutes(state.routeList), [state.routeList,userRole]);

    const validateCurrentRoute = () => {
        setState(() => ({...state, routeList: ROUTE_LIST()}));
    };

    useEffect(()=>{
        localStorage.getItem("token") && dispatch(RefreshApi());
    },[])

    useEffect(() => {
        validateCurrentRoute();
    }, [isLogged,location.pathname]);

    return (<>
        <Tools />
        <Routes>
            {routes}
            <Route
                path="*"
                element={<Navigate to={localStorage.getItem('token') ? userId && (userRole===userRoleConst.admin ? '/' : `${paths.employee}/${userId}?tab=personalinfo`) : '/login'} replace/>}
            />
        </Routes>
    </>)
};

export default Router;