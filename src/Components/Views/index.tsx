import React, { useState } from "react";
import { Grid, Container, Box } from "@mui/material";
import TextFields from "./Textfield/TextFields";
import Button from "./Button/Button";
import DatePicker from "./date-picker/DatePicker";
import TextAreas from "./Textarea/Textareas";
import DropDown from "./DropDown/DropDown";
import Modal from "./Model/Modal";
import NavigationTab from "./NavigationTab/NavigationTab";
import FormModel from "./Model/FormModel";
import ModelTable from "./Model/ModelTable";
import ButtonTable from "./Button/ButtonTable";
import DropDownTable from "./DropDown/DropDownTable";
import TextareasTable from "./Textarea/TextareasTable";
import TextFieldsTable from "./Textfield/TextFieldsTable";
import TimePicker from "./TimePicker/TimePicker";

//dummycomponents for navigationTab
import PersonalInfo from "./DummyComponents/PersonalInfo";
import BankInfo from "./DummyComponents/BankInfo";
import DocInfo from "./DummyComponents/DocInfo";
import OtherInfo from "./DummyComponents/OtherInfo";
import Table from "./Table/Table";
import TablePropsTable from "./Table/TablePropsTable";
import Loader from "./Loader/Loader";
import Autocompletes from "./Autocomplete/Autocomplete";
import Toaster from "./Toaster/ToastNotification";
import ToastNotification from "./Toaster/ToastNotification";
import ConfirmModel from "./ConfirmModel/ConfirmModel";

function Views() {
  //for textfield
  const [data, setdata] = useState("");

  const validateData = (event: any) => {
    const { name, value } = event.target;
    setdata(value);
  };

  //Model
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  //for navigation tab
  const tabs = [
    {
      label: "Personal Information",
      tab: `personalinfo`,
      component: <PersonalInfo />,
    },
    {
      label: "Bank Information",
      tab: `bankinfo`,
      component: <BankInfo />,
    },
    {
      label: "Document Information",
      tab: `docinfo`,
      component: <DocInfo />,
    },
    {
      label: "Other Information",
      tab: `otherinfo`,
      component: <OtherInfo />,
    },
  ];
  // for DropDown
  const [selectedValue, setSelectedValue] = useState("");
  const onChangeHandler = (event: any) => {
    setSelectedValue(event.target.value);
  };

  //for autocomplete
  const options = ["Ronak Koladiya", "Ronak patel"];

  //for Toster
  const [toaster, setToaster] = useState({
    toasterMsg: "Error Found ",
    variant: "error",
    isOpen: true,
  });

  // Handle the confirmation action here
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleConfirmAction = () => {
    console.log('Confirmed');
  }
  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          {/*Dynamic textfield*/}
          <Grid item xs={12} sm={6} md={4}>
            <h2>Textfield</h2>
            <span>Email*</span>
            <br />
            <TextFields type={"email"} value={data} onChange={validateData} />
          </Grid>

          {/*Dynamic Textarea*/}
          <Grid item xs={12} sm={6} md={4}>
            <h2>Textarea</h2>
            <TextAreas />
          </Grid>

          {/*Date picker*/}
          <Grid item xs={12} sm={6} md={4}>
            <h2>Datepicker</h2>
            <DatePicker />
          </Grid>

          {/*Date picker*/}
          <Grid item xs={12} sm={6} md={4}>
            <h2>Datepicker Field</h2>
            <DatePicker dateField />
          </Grid>

          {/*Dynamic Dropdown*/}
          <Grid item xs={12} sm={6} md={4}>
            <h2>Dropdown</h2>
            <DropDown
              onChange={onChangeHandler}
              value={selectedValue}
              options={[
                { value: "", Text: "Project Name" },
                { value: "project-1", Text: "project-1" },
                { value: "project-2", Text: "project-2" },
                { value: "project-3", Text: "project-3" },
                { value: "project-4", Text: "project-4" },
              ]}
            />
          </Grid>

          {/*Dynamic Model*/}
          <Grid item xs={12} sm={6} md={4}>
            <h2>Model</h2>
            <Button onClick={handleModalOpen} text="Open Modal" />
            <Modal
              open={modalOpen}
              onClose={handleModalClose}
              headding="Branch details"
              body={<FormModel />} // Pass your form component here
              cancelBtn
              cancelIcon
            />
          </Grid>

          {/*Dynamic Button*/}
          <Grid item xs={12} sm={6} md={4}>
            <h2>Buttons</h2>
            <Button variant="text" sx={{ marginRight: "10px" }} selected />
            <Button sx={{ backgroundColor: "#FFA8C5", color: "#000981" }} />
          </Grid>

          {/*Dynamic Timepicker*/}
          <Grid item xs={12} sm={6} md={4}>
            <h2>Timepicker in Hours</h2>
            <TimePicker />
          </Grid>

          {/*Dynamic Timepicker*/}
          <Grid item xs={12} sm={6} md={4}>
            <h2>Timepicker in Minutes</h2>
            <TimePicker minutes />
          </Grid>

          {/*Dynamic autocompletefield*/}
          <Grid item xs={12} sm={6} md={4}>
            <h2>Autocomplete Field</h2>
            <Autocompletes
              options={options}
              onChange={(data: any) => {
                console.log(data);
              }}
            />
          </Grid>

          {/*Dynamic Navigation Tab*/}
          <Grid item xs={12}>
            <h2>Navigation Tab</h2>
            <NavigationTab tabs={tabs} />
          </Grid>
          <Grid item xs={12}>
            <h2>Loader</h2>
            <Loader />
          </Grid>
          {/*Dynamic Table*/}
          <Grid item xs={12}>
            <h2>Table</h2>
            <Table
              columns={[
                { header: "Report Date", field: "reportdate" },
                { header: "Project", field: "project" },
                { header: "Task", field: "task" },
                { header: "Hours", field: "hours" },
                { header: "Status", field: "status" },
                {
                  header: "Actions",
                  field: "actions",
                  renderInput: () => <Button>Hello</Button>,
                },
              ]}
              data={[
                {
                  reportdate: "00-00-0000",
                  project: "App",
                  task: "Ui Changes",
                  hours: "02:15:00",
                  status: "complete",
                  actions: "9 Jan 2023",
                },
                {
                  reportdate: "00-00-0000",
                  project: "App",
                  task: "Ui Changes",
                  hours: "02:15:00",
                  status: "complete",
                  actions: "9 Jan 2023",
                },
                {
                  reportdate: "00-00-0000",
                  project: "App",
                  task: "Ui Changes",
                  hours: "02:15:00",
                  status: "complete",
                  actions: "9 Jan 2023",
                },
                {
                  reportdate: "00-00-0000",
                  project: "App",
                  task: "Ui Changes",
                  hours: "02:15:00",
                  status: "complete",
                  actions: "9 Jan 2023",
                },
                {
                  reportdate: "00-00-0000",
                  project: "App",
                  task: "Ui Changes",
                  hours: "02:15:00",
                  status: "complete",
                  actions: "9 Jan 2023",
                },
              ]}
              // tablebodyheader={<h2>Today</h2>}
            />
          </Grid>
        </Grid>
        {/*Dynamic Toster*/}
        <ToastNotification
          actionText={"cancel"}
          variant={toaster?.variant}
          title={toaster?.toasterMsg}
          open={toaster?.isOpen}
          duration={5000}
          gap={17}
          verticalPosition="top"
          close={() => {
            setToaster({ toasterMsg: "", variant: "", isOpen: false });
          }}
        />

         {/*Dynamic Confirm Model*/}.
      <Grid item xs={12}>
        <h2>Confirm Model</h2>
        <Button variant="outlined" onClick={()=>handleClickOpen()} text='Open Confirmation Modal' />
        <ConfirmModel onConfirm={()=>handleConfirmAction()} open={open} onClose={() => setOpen(false)} />
      </Grid>
      </Container>
     
      {/*table*/}
      <Container sx={{ py: 4 }}>
        <h1>All Dynamic Components Props Details </h1>
        <Box sx={{ py: 5 }}>
          <h1>Text Field</h1>
          <TextFieldsTable />
        </Box>
        <Box sx={{ py: 5 }}>
          <h1>Text Area</h1>
          <TextareasTable />
        </Box>
        <Box sx={{ py: 5 }}>
          <h1>Button</h1>
          <ButtonTable />
        </Box>
        <Box sx={{ py: 5 }}>
          <h1>DropDown</h1>
          <DropDownTable />
        </Box>
        <Box sx={{ py: 5 }}>
          <h1>Model</h1>
          <ModelTable />
        </Box>
        <Box sx={{ py: 5 }}>
          <h1>Table</h1>
          <TablePropsTable />
        </Box>
      </Container>
    </>
  );
}

export default Views;
