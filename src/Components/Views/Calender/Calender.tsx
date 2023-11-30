import React from "react";
//css
import "./Calender.css";
//calender
import {Scheduler} from "@aldabil/react-scheduler";
//types
import CalenderProps from "./Calender.types";

function Calender({width,...props} :CalenderProps){
    return (
        <>
            <section className={'calenderWrapper'}>
                <div className={'calender'} style={{width: width}}>
                    <Scheduler
                        view={"month"}
                        day={null}
                        week={null}
                        // @ts-ignore
                        month={{
                            weekStartOn: 0,
                            disableGoToDay: true,
                        }}
                        {...props}
                    />
                </div>
            </section>
        </>
    );
}

export default Calender;