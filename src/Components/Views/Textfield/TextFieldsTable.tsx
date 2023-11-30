import React from "react";
import Table from "../Table/Table";


const TextFieldsTable = () => {
  const propsData = [
    { name: "type", type: "string", required: "Yes", description: "The type of input field (e.g., 'text', 'password', 'email')." },
    { name: "label", type: "string", required: "No", description: "The label for the input field." },
    { name: "variant", type: "string",required: "No", description: "The variant of the input field (e.g., 'outlined', 'filled')." },
    { name: "placeholder", type: "string",required: "No", description: "The placeholder text for the input field." },
    { name: "width", type: "string",required: "No", description: "The width of the input field." },
    { name: "autocomplete", type: "string", required: "No",description: "The autocomplete behavior for the input field." },
    { name: "value", type: "string", required: "No",description: "The current value of the input field." },
    { name: "name", type: "string", required: "No",description: "The name attribute of the input field." },
    { name: "required", type: "string", required: "Yes", description: "Indicates if the input field is required ('Yes' or 'No')." },
    { name: "disabled", type: "string", required: "No",description: "Indicates if the input field is disabled ('Yes' or 'No')." },
    { name: "helperText", type: "string",required: "No", description: "Helper text to provide additional information or context." },
    { name: "textColor", type: "string", required: "No",description: "The color of the input text." },
    { name: "borderColor", type: "string", required: "No",description: "The color of the input field border." },
    { name: "focusedBorderColor", type: "string",required: "No", description: "The color of the input field border when focused." },
    { name: "labelColor", type: "string",required: "No", description: "The color of the input field label." },
    { name: "helperTextColor", type: "string",required: "No", description: "The color of the helper text." },
    { name: "readOnly", type: "string",required: "No", description: "Indicates if the input field is read-only ('Yes' or 'No')." },
    { name: "onChange", type: "function", required: "Yes", description: "Callback function to handle input value change." },
];
  const propsHeader = [
    { header: "Name", field: "name" },
    { header: "Type", field: "type" },
    { header: "Required", field: "required" },
    { header: "Description", field: "description" },
  ];
  return (
    <Table columns={propsHeader} data={propsData} />
  );
};

export default TextFieldsTable;
