import React from "react";
import Table from "../Table/Table";

const ButtonTable = () => {
  const propsHeader = [
    { header: "Name", field: "name" },
    { header: "Type", field: "type" },
    { header: "Required", field: "required" },
    { header: "Description", field: "description" },
  ];
  const propsData = [
    {
      name: "sx",
      type: "object",
      required: "No",
      description: "Custom styles for the button.",
    },
    {
      name: "endIcon",
      type: "JSX",
      required: "No",
      description:
        "Icon component to be displayed at the end of the button text.",
    },
    {
      name: "startIcon",
      type: "JSX",
      required: "No",
      description:
        "Icon component to be displayed at the start of the button text.",
    },
    {
      name: "variant",
      type: "string",
      required: "No",
      description:
        "The variant of the button (e.g., 'text', 'outlined', 'contained').",
    },
    {
      name: "loading",
      type: "boolean",
      required: "No",
      description:
        "A boolean indicating whether the button is in a loading state.",
    },
    {
      name: "text",
      type: "string",
      required: "Yes",
      description: "The text content of the button.",
    },
    {
      name: "disabled",
      type: "boolean",
      required: "No",
      description: "A boolean indicating whether the button is disabled.",
    },
    {
      name: "selected",
      type: "boolean",
      required: "No",
      description: "A boolean indicating whether the button is selected.",
    },
    {
      name: "onClick",
      type: "function",
      required: "Yes",
      description: "Callback function to handle button click event.",
    },
    {
      name: "...props",
      type: "object",
      required: "No",
      description:
        "Additional props from the Button component of @mui/material.",
    },
  ];

  return (
    <Table columns={propsHeader} data={propsData} />
  );
};

export default ButtonTable;
