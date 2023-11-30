import React from "react";
import Table from "../Table/Table";

const ModelTable = () => {
  const propsHeader = [
    { header: "Name", field: "name" },
    { header: "Type", field: "type" },
    { header: "Required", field: "required" },
    { header: "Description", field: "description" },
  ];

  const propsData = [
    { name: "sx", required: "No", type: "object", description: "Custom styles for the modal." },
    { name: "open", required: "Yes", type: "boolean", description: "A boolean indicating whether the modal is open." },
    { name: "onClose", required: "Yes", type: "function", description: "Callback function to handle modal close event." },
    { name: "body", required: "Yes", type: "JSX", description: "The content to be displayed inside the modal body." },
    { name: "headding", required: "No", type: "string", description: "The heading/title of the modal." },
    { name: "cancelIcon", required: "No", type: "boolean", description: "A boolean indicating whether to display a cancel icon in the modal header." },
    { name: "cancelBtn", required: "No", type: "boolean", description: "A boolean indicating whether to display a cancel button at the bottom of the modal." },
    { name: "...props", required: "No", type: "object", description: "Additional props to be passed to the underlying MuiModal component from @mui/material." },
  ];

  return (
    <Table columns={propsHeader} data={propsData} />
  );
};

export default ModelTable;
