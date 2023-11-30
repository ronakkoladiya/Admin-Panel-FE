import React from 'react';
import { Box, Grid } from "@mui/material";
import DropDown from "../../../Views/DropDown/DropDown";
import TimePicker from "../../../Views/TimePicker/TimePicker";
import TextAreas from "../../../Views/Textarea/Textareas";
import TextFields from '../../../Views/Textfield/TextFields';
import Button from '../../../Views/Button/Button';

const CreateReportAdd = ({
  allreportdata,
  changehandler,
  projectNameOption,
  changehourshandler,
  changeminuteshandler,
  handleClearData,
  handleDeleteData,
  errors,
}: any) => {

  return (
    <>
      {allreportdata.project.map((data: any, dataOfIndex: number) => (
        <>
          <Box
            sx={{ backgroundColor: "#ffffff", borderRadius: "10px", my: 8 }}
            key={dataOfIndex}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              spacing={4}
              sx={{ p: 3, ".MuiGrid-item": { paddingTop: 0 } }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <h6
                  style={{
                    color: "#00032E",
                    fontSize: "15px",
                    fontWeight: "400",
                    padding: "20px 0px 10px 0px ",
                  }}
                >
                  Project Name
                </h6>
                <DropDown
                  onChange={(event: any) => changehandler(event, dataOfIndex)}
                  value={data.projectId}
                  name="projectId"
                  options={[
                    { value: "", Text: "Project Name" },
                    ...projectNameOption,
                  ]}
                />
                {/* Display error message for projectId */}
                {errors &&
                  errors.projectData &&
                  errors.projectData[dataOfIndex] &&
                  errors.projectData[dataOfIndex].projectId && (
                    <div style={{ color: 'red' }}>
                      {errors.projectData[dataOfIndex].projectId}
                    </div>
                  )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <h6
                  style={{
                    color: "#00032E",
                    fontSize: "15px",
                    fontWeight: "400",
                    padding: "20px 0px 10px 0px ",
                  }}
                >
                  Client
                </h6>
                <TextFields
                  name="client"
                  placeholder="Globle Tech.."
                  // Add similar error message display logic for the client field
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <h6
                  style={{
                    color: "#00032E",
                    fontSize: "15px",
                    fontWeight: "400",
                    padding: "20px 0px 10px 0px ",
                  }}
                >
                  Hours
                </h6>
                <TimePicker
                  placeholder="00"
                  value={data.hours}
                  onChange={(event: any) =>
                    changehourshandler(event, dataOfIndex)
                  }
                />
                {/* Display error message for hours */}
                {errors &&
                  errors.projectData &&
                  errors.projectData[dataOfIndex] &&
                  errors.projectData[dataOfIndex].hours && (
                    <div style={{ color: 'red' }}>
                      {errors.projectData[dataOfIndex].hours}
                    </div>
                  )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <h6
                  style={{
                    color: "#00032E",
                    fontSize: "15px",
                    fontWeight: "400",
                    padding: "20px 0px 10px 0px ",
                  }}
                >
                  Minutes
                </h6>
                <TimePicker
                  minutes
                  placeholder="00"
                  value={data.minutes}
                  onChange={(event: any) =>
                    changeminuteshandler(event, dataOfIndex)
                  }
                />
                {/* Display error message for minutes */}
                {errors &&
                  errors.projectData &&
                  errors.projectData[dataOfIndex] &&
                  errors.projectData[dataOfIndex].minutes && (
                    <div style={{ color: 'red' }}>
                      {errors.projectData[dataOfIndex].minutes}
                    </div>
                  )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                padding={dataOfIndex ? "0px" : "10px 0px 40px 0px "}
              >
                <h6
                  style={{
                    color: "#00032E",
                    fontSize: "15px",
                    fontWeight: "400",
                    padding: "20px 0px 10px 0px ",
                  }}
                >
                  Description
                </h6>
                <TextAreas
                  minRows={5}
                  maxRows={5}
                  resize="none"
                  placeholder="Enter your description here..."
                  value={data.description}
                  name="description"
                  onChange={(event: any) => changehandler(event, dataOfIndex)}
                />
                {/* Display error message for description */}
                {errors &&
                  errors.projectData &&
                  errors.projectData[dataOfIndex] &&
                  errors.projectData[dataOfIndex].description && (
                    <div style={{ color: 'red' }}>
                      {errors.projectData[dataOfIndex].description}
                    </div>
                  )}
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "20px 0px 0px 0px ",
                  }}
                >
                  <Box sx={{ px: 2, display: dataOfIndex ? "flex" : "none" }}>
                    <Button
                      onClick={() => handleClearData(dataOfIndex)}
                      text="Clear"
                      sx={{ backgroundColor: "#F5F5F5", color: "#808297" }}
                    />
                  </Box>
                  <Box sx={{ display: dataOfIndex ? "block" : "none" }}>
                    <Button
                      onClick={() => handleDeleteData(dataOfIndex)}
                      text="Delete"
                      sx={{ backgroundColor: "#FFA8C5", color: "#000981" }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      ))}
    </>
  );
};

export default CreateReportAdd;
