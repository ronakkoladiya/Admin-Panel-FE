import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Grid, Button} from "@mui/material";
// @ts-ignore
import styled from 'styled-components';
import style from "./CreateProject.module.css";
import DatePicker from "../../../Views/date-picker/DatePicker";
import TextFields from "../../../Views/Textfield/TextFields";
import TextAreas from "../../../Views/Textarea/Textareas";
import DropDown from "../../../Views/DropDown/DropDown";
import Autocompletes from "../../../Views/Autocomplete/Autocomplete";
import {fakeData, paths} from "../../../../Utiles/constant";
import {useDispatch, useSelector} from "react-redux";
import {GetTechnologyApi, GetUserByDesignation, ProjectPostApi} from "../../../../Redux/Actions/Project";

function CreateProject(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeSave, setActiveSave] = useState(false);
    const {getUsers, getTech} = useSelector((state:any) => ({
        getUsers: state?.userByDesignation?.list || [],
        getTech: state?.technology?.list || []
    }));

    const [projectData, setProjectData] = useState({
        projectName: '',
        client: '',
        startDate: '',
        endDate: '',
        status: '',
        technology: [],
        teamLeader: [],
        teamMembers: [],
        description: ''
    });

    const getProjectData = (name: string, value: any, reSetArray:any = []) => {
        let obj : any = {};

        reSetArray?.forEach((item:any)=>{
            obj[item?.key] = item?.value;
        })

        setProjectData((prevState) => ({
            ...prevState,
            [name]: value,
            ...obj
        }));
    }

    useEffect(() => {
        Object.values(projectData).every(value => (Array.isArray(value) ? value.length > 0 : value !== ''))
            ? setActiveSave(true)
            : setActiveSave(false)
    },[projectData]);

    useEffect(() => {
        dispatch(GetUserByDesignation());
        dispatch(GetTechnologyApi());
    },[])

    return(
      <>
          <Box>
              <Grid container sx={{justifyContent: 'space-between',alignItems: 'center'}}>
                  <Grid item>
                      <h2>Create Project</h2>
                  </Grid>
                  <Grid className={`${style.actionBtns}`} item sx={{display: 'flex', alignItems: 'center'}}>
                      <button
                          className={`${style.cancelBtn}`}
                          onClick={() => navigate(-1)}
                      >
                          Cancel
                      </button>
                      <button
                          className={`${style.saveBtn} ${!activeSave ? style.disabled : ''}`}
                          onClick={() => {
                              dispatch(ProjectPostApi(projectData));
                              navigate(-1);
                          }}
                      >
                          Save
                      </button>
                  </Grid>
              </Grid>
              <section className={`${style.formSec}`}>
                  <div className={`${style.textField}`}>
                      <p>Project Name</p>
                      <TextFields
                          placeholder={'Project Name'}
                          name={'projectName'}
                          value={projectData.projectName}
                          onChange={(e:any) => getProjectData(e.target.name, e.target.value)}
                      />
                  </div>
                  <div className={`${style.textField}`}>
                      <p>Client</p>
                      <TextFields
                          placeholder={'Client'}
                          name={'client'}
                          value={projectData.client}
                          onChange={(e:any) => getProjectData(e.target.name, e.target.value)}
                      />
                  </div>
                  <div className={`${style.textField}`}>
                      <p>Start Date</p>
                      <DatePicker
                          dateField
                          onChange={(newDate:any) => getProjectData('startDate', newDate)}
                      />
                  </div>
                  <div className={`${style.textField}`}>
                      <p>End Date</p>
                      <DatePicker
                          dateField
                          onChange={(newDate:any) => getProjectData('endDate', newDate)}
                      />
                  </div>
                  <div className={`${style.textField}`}>
                      <p>Status</p>
                      <DropDown
                          options={[
                              { Text: "Status" },
                              { value: "active", Text: "Active" },
                              { value: "de-active", Text: "Deactive" },
                          ]}
                          onChange={(e:any) => getProjectData('status', e.target.value)}
                      />
                  </div>
                  <div className={`${style.textField}`}>
                      <p>Technology</p>
                      <DropDown
                          multiple={true}
                          options={[
                              { Text: "Technology" },
                              ...getTech?.map((item:any) => ({
                                  Text: item.name,
                                  value: item._id
                              }))
                          ]}
                          onChange={(e:any) => {
                              getProjectData('technology', e.target.value, [
                                  {
                                      key: 'teamLeader',
                                      value: []
                                  },
                                  {
                                      key: 'teamMembers',
                                      value: []
                                  }
                              ]);
                          }}

                      />
                  </div>
                  <div className={`${style.textField}`}>
                      <p>Team Leader</p>
                      <Autocompletes
                          value={projectData.teamLeader}
                          options={[
                          ...getUsers
                              ?.filter((user:any) => projectData.technology
                                  ?.some((techName:any) => techName === user?.technology?._id))
                              ?.map((item:any) => ({
                                  title: `${item.firstName} ${item.lastName}`,
                                  id: item._id
                            }))
                          ]}
                          disabled={projectData.technology.length > 0 ? false : true}
                          customValue={true}
                          onChange={(newValue:any) => getProjectData('teamLeader', newValue.map((data:any) => data.id))}
                      />
                  </div>
                  <div className={`${style.textField}`}>
                      <p>Team Members</p>
                      <Autocompletes
                          value={projectData.teamMembers}
                          options={[
                                ...getUsers
                                  ?.filter((user:any) => projectData.technology
                                      ?.some((techName:any) => techName === user?.technology?._id))
                                  ?.map((item:any) => ({
                                      title: `${item.firstName} ${item.lastName}`,
                                      id: item._id
                                }))
                          ]}
                          disabled={projectData.technology.length > 0 ? false : true}
                          customValue={true}
                          onChange={(newValue:any) => getProjectData('teamMembers', newValue.map((data:any) => data.id))}
                      />
                  </div>
                  <div className={`${style.textArea}`}>
                      <p>Description</p>
                      <TextAreas
                          minRows={4}
                          resize={'none'}
                          onChange={(e: any) => getProjectData('description', e.target.value)}
                      />
                  </div>
              </section>
          </Box>
      </>
    );
}

export default CreateProject;