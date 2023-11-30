
import React from "react";
import Table from "../Table/Table";


const TextareasTable = () => {
  const propsData = [
    { name: "value", type: "string",required: "No", description: "The current value of the textarea." },
    { name: "minRows", type: "number",required: "No", description: "The minimum number of visible rows for the textarea." },
    { name: "textColor", type: "string",required: "No", description: "The color of the text in the textarea." },
    { name: "borderColor", type: "string",required: "No", description: "The color of the border around the textarea." },
    { name: "focusedBorderColor",required: "No", type: "string", description: "The color of the border around the textarea when focused." },
    { name: "resize", type: "string",required: "No", description: "The resize property of the textarea ('both', 'vertical', 'horizontal', 'none')." },
    { name: "onChange", type: "function", required: "Yes" , description: "Callback function to handle textarea value change."},
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

export default TextareasTable;
