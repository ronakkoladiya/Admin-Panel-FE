import React from "react";
import { ManageDesignation } from "./ManageDesignation";
import NavigationTab from "../../Views/NavigationTab/NavigationTab";
import ManageTechnology from "./ManageTechnology/ManageTechnology";


 const tabs = [
     {
         label: "Manage Designation",
         tab: `managedesignation`,
         component: <ManageDesignation />,
     },
     {
         label: "Manage Technology",
         tab: `managetechnology`,
         component: <ManageTechnology />,
     },
 ];

function Manage() {
    return(
        <>
            <div style={{padding:"20px 0px "}}>
                <NavigationTab tabs={tabs} />
            </div>
        </>
    );
}

export default Manage;