import React from "react";
import Table from "../Table/Table";

const DropDownTable = () => {
  const propsHeader = [
    { header: "Name", field: "name" },
    { header: "Type", field: "type" },
    { header: "Required", field: "required" },
    { header: "Description", field: "description" },
  ];
  const propsData = [
    { name: "labelName", required: "No", type: "string", description: "If normal dropdown so not required otherwise The name for the label of the dropdown." },
    { name: "variant", required: "No", type: "string", description: "The variant of the dropdown (e.g., 'outlined', 'filled', 'standard')." },
    { name: "label", required: "No", type: "string", description: "The label of the dropdown." },
    { name: "options", required: "Yes", type: "array", description: "An array of options for the dropdown." },
    { name: "withoutlined", required: "No", type: "boolean", description: "A boolean indicating whether to display the label as an outline." },
    { name: "selectsx", required: "No", type: "object", description: "Custom styles for the Select component." },
    { name: "onChange", required: "Yes", type: "function", description: "Callback function to handle value change." },
    { name: "defaultValue", required: "No", type: "any", description: "The default value of the dropdown." },
    { name: "onBlur", required: "No", type: "function", description: "Callback function to handle blur event." },
    { name: "onFocus", required: "No", type: "function", description: "Callback function to handle focus event." },
    { name: "optionsx", required: "No", type: "object", description: "Custom styles for the dropdown options." },
    { name: "optionColor", required: "No", type: "string", description: "Custom color for the options." },
    { name: "error", required: "No", type: "boolean", description: "A boolean indicating whether the dropdown is in an error state." },
    { name: "multiple", required: "No", type: "boolean", description: "A boolean indicating whether the dropdown allows multiple selections." },
    { name: "IconComponent", required: "No", type: "JSX", description: "Custom icon component to be used in the dropdown." },
  ];

  return (
    <Table columns={propsHeader} data={propsData} />
  )
};

export default DropDownTable;
