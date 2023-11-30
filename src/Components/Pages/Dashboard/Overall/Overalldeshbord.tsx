import style from '../Overall/Overalldeshbord.module.css'
import {Grid} from "@mui/material";
import Barchart from './Barchart';
import Calender from "../../../Views/Calender/Calender";
import Box from "@mui/material/Box";
import React from "react";
import {fakeData, label} from "../../../../Utiles/constant";

const Overalldeshbord = () => {
    return (

        <>
            <div className={style.dash_main}>
                <Grid container className={style.dash_main_2}>
                    <Grid item className={style.leave_em}>
                        <h5 className={style.leave_em_h5}>Leave Employer</h5>
                        <Barchart width={'890px'}
                                  data={fakeData.chartData.leaveEmployer}
                                  categories={label.chartData.chartWeekLabel}
                        />
                    </Grid>
                    <Grid item className={style.leave_em2}>
                        <div>
                            <p>Sick</p>
                            <span>4</span>
                        </div>
                        <div>
                            <p>Medical</p>
                            <span>6</span>
                        </div>
                        <div>
                            <p>Casual</p>
                            <span>2</span>
                        </div>
                        <div>
                            <p>Short</p>
                            <span>0</span>
                        </div>
                        <div>
                            <p>Half</p>
                            <span>3</span>
                        </div>
                        <div>
                            <p>Emergency</p>
                            <span>1</span>
                        </div>
                    </Grid>
                </Grid>
                <div className={style.new_em}>
                    <h5 className={style.new_em_h5}>New Employer</h5>
                    <Barchart width={'1300px'}
                              data={fakeData.chartData.newEmployer}
                              categories={label.chartData.chartMonthLabel}
                    />
                </div>
                <div className={style.holiday_em} style={{margin: "25px 0"}}>
                    <Calender/>
                </div>
            </div>
        </>

    )
}

export default Overalldeshbord