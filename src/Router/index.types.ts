import React from "react";

export interface State {
    routeList: RouteObject[]
}

export interface RouteObject {
    userAccess: any;
    name: string;
    path: string;
    element: React.ElementType;
    authRequired: boolean;
    children?: RouteObject[];
}
