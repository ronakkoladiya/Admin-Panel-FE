import React from "react";
import Table from "./Table";


const TablePropsTable = () => {
  const propsData = [
    {
      name: "columns",
      required: "Yes",
      type: "array",
      description: "An array of column configurations for the table.",
    },
    {
      name: "data",
      required: "Yes",
      type: "array",
      description: "An array of data objects to populate the table rows.",
    },
    {
      name: "tablesx",
      required: "No",
      type: "object",
      description: "Additional styles for the outer Table component.",
    },
    {
      name: "tableheadsx",
      required: "No",
      type: "object",
      description: "Additional styles for the TableHead component.",
    },
    {
      name: "tablebodyheader",
      required: "No",
      type: "string",
      description: "Content for the table body header.",
    },
    {
      name: "tablebodysx",
      required: "No",
      type: "object",
      description: "Additional styles for the TableBody component.",
    },
    {
      name: "tablerowsx",
      required: "No",
      type: "object",
      description: "Additional styles for the table rows.",
    },
    {
      name: "tablecellsx",
      required: "No",
      type: "object",
      description: "Additional styles for the table cells.",
    },
    {
      name: "oddcolor",
      required: "No",
      type: "string",
      description: "Background color for odd-numbered rows.",
    },
    {
      name: "evencolor",
      required: "No",
      type: "string",
      description: "Background color for even-numbered rows.",
    },
    // ... add more props if needed
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

export default TablePropsTable;
