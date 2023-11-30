import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// css
import style from "./NavigationTab.module.css";

// types
import NavigationTabTypes from "./NavigationTab.types";

/**
 * tabs format it gonna receive
 *  constant tabs = [
        {
            label: "Personal Information",
            tab: `personalinfo`,
            component: <YourComponent/>
        },
    ];
 *
 *
 */

function NavigationTab({ tabs }: { tabs: NavigationTabTypes[] }){
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tabParam = params.get("tab");

        tabParam ? setActiveTab(tabParam) : setActiveTab(tabs[0].tab);
    },[location.search]);

    return (
        <>
            <section className={`${style.navTab}`}>
                <nav>
                    {
                        tabs.map((data) => (
                            <button
                                key={data.tab}
                                className={`${style.titleBtn} ${activeTab === data.tab ? style.activeNav : ""}`}
                                onClick={() => navigate(`${location.pathname}?tab=${data.tab}`)}
                            >
                                {data.label}
                            </button>
                        ))
                    }
                </nav>
            </section>

            {/* loading component */}
            {tabs.find((tab) => tab.tab === activeTab)?.component}
        </>
    );
}

export default NavigationTab;