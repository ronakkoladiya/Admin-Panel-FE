import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { TableProps, dataTypes, stateHandlerTypes } from "./Table.types";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import Pagination from "../Pagination/Pagination";
import TextFields from "../Textfield/TextFields";
import Button from "../Button/Button";

const Table = ({
  columns,
  data,
  tablesx,
  tableheadsx,
  tablebodyheader,
  tablebodysx,
  tablerowsx,
  tablecellsx,
  oddcolor,
  evencolor,
  withindex,
  pagination,
  itemsPerPage,
}: TableProps) => {
  // Create a custom styled MuiTable using Emotion
  const CustomModal = styled(MuiTable)(({ theme }) => ({}));
  const [currentPageData, setCurrentPageData] = useState(data || []);
  const [paginationData, setPaginationData] = React.useState({
    currentPage: 1,
    lastIndex: 1,
    goPageValue: 1,
    itemsPerPage:itemsPerPage || 6,
  });

  useEffect(() => {
    setPaginationData((prevstate: any) => ({ ...prevstate, goPageValue: 1 }));
    if (!pagination) {
      setCurrentPageData(data);
    }
  }, [data]);
  const stateHandler = ({ name, value }: stateHandlerTypes, setState: any) => {
    setState((preState: dataTypes) => ({
      ...preState,
      [name]: value,
    }));
  };
  const getdata = (data: dataTypes[]) => {
    setCurrentPageData(data);
  };

  const getCurrentPage = (page: string) => {
    stateHandler({ name: "currentPage", value: page }, setPaginationData);
  };

  const getlastindex = (lastPageIndex: string) => {
    stateHandler(
      { name: "lastIndex", value: lastPageIndex },
      setPaginationData
    );
  };

  const pageChangedClickHandler = () => {
    stateHandler(
      { name: "currentPage", value: paginationData.goPageValue },
      setPaginationData
    );
  };

  const handleInput = (event: any) => {
    const inputValue = event.target.value;
    if (0 <= inputValue && inputValue <= paginationData.lastIndex) {
      stateHandler(
        { name: "goPageValue", value: inputValue },
        setPaginationData
      );
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          "&::-webkit-scrollbar": {
            width: 2,
            height: "5px",
            cursor: "pointer",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#F2F5FF",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#8189ff",
            borderRadius: 2,
          },
          position: "relative",
          overflowX: "auto",
        }}
      >
        {/* Custom styled MuiTable */}
        <CustomModal sx={tablesx}>
          <TableHead sx={{ backgroundColor: "#CCCFFF", ...tableheadsx }}>
            <TableRow sx={{ ...tablerowsx }}>
              {withindex && (
                <TableCell
                  sx={{ fontSize: "16px", fontWeight: "bold", ...tablecellsx }}
                ></TableCell>
              )}

              {columns.map((column: any, columnOfIndex: number) => (
                <TableCell
                  sx={{ fontSize: "16px", fontWeight: "bold", ...tablecellsx }}
                  key={columnOfIndex}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={tablebodysx}>
            {/* tablebodyheader */}
            {tablebodyheader && (
              <TableRow
                sx={{ backgroundColor: oddcolor || "#F2F5FF", ...tablerowsx }}
              >
                <TableCell
                  sx={{
                    backgroundColor: oddcolor || "#F2F5FF",
                    ...tablecellsx,
                    width: "100%",
                  }}
                  colSpan={columns.length}
                >
                  {tablebodyheader}
                </TableCell>
              </TableRow>
            )}
            {/* Loop through data and create rows */}

            {currentPageData?.length === 0 ? (
              // Display a "No Data" row when data is empty
              <TableRow>
                <TableCell
                  colSpan={columns.length + (withindex ? 1 : 0)}
                  sx={{
                    textAlign: "center",
                    backgroundColor: "#F2F5FF",
                    fontWeight: "600",
                    padding: "16px",
                    ...tablecellsx,
                  }}
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              currentPageData?.map((row: any, rowOfIndex: number) => (
                <TableRow
                  key={rowOfIndex}
                  sx={{
                    backgroundColor:
                      rowOfIndex % 2 === 0
                        ? oddcolor || "#F2F5FF"
                        : evencolor || "#E5E7FF",
                    ...tablerowsx,
                  }}
                >
                  {withindex && (
                    <TableCell key={rowOfIndex} sx={tablecellsx}>
                      {pagination ? paginationData.itemsPerPage * (paginationData.currentPage - 1) + rowOfIndex +1 : rowOfIndex + 1}
                    </TableCell>
                  )}

                  {columns?.map(
                    (
                      { renderInput = (value: any) => value.value, field, rowsx }: any,
                      colOfIndex: number
                    ) => (
                      <>
                        <TableCell key={colOfIndex} sx={{...tablecellsx, ...rowsx}}>
                          {renderInput({
                            rowData: row,
                            value: row[field],
                            rowIndex: rowOfIndex,
                          })}
                        </TableCell>
                      </>
                    )
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </CustomModal>
      </TableContainer>
      {pagination && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "8vh",
            }}
          >
            <Box>
              <Box
                sx={{
                  borderBottom: "1px solid #80829780",
                  paddingBottom: "3px",
                }}
              >
                <Pagination
                  itemsPerPage={paginationData.itemsPerPage}
                  data={data}
                  CurrentPagevalue={paginationData?.currentPage}
                  getcurrentdata={getdata}
                  getcurrentPage={getCurrentPage}
                  getlastindex={getlastindex}
                  sx={{
                    "& .MuiPaginationItem-root.Mui-selected": {
                      fontWeight: "bold",
                    },
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  color: "#808297",
                  fontSize: "11px",
                  textAlign: "right",
                  pr: 1.5,
                }}
              >
                {paginationData.currentPage}/{paginationData.lastIndex} Page
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                color: "#808297",
                fontSize: "14px",
                textAlign: "right",
                pr: 1.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ padding: "0px 18px" }}>
                  Go to page{" "}
                </Typography>
                <Box sx={{ padding: "0px 18px 0 0 " }}>
                  <TextFields
                    type="number"
                    borderColor="#8189FF"
                    width="37px"
                    value={paginationData.goPageValue}
                    onChange={handleInput}
                    sx={{
                      ".MuiInputBase-input": {
                        padding: "0 !important",
                        textAlign: "center",
                        height: "37px",
                        fontWeight: "bold",
                      },
                    }}
                  />
                </Box>
                <Button
                  style={{ padding: "8px -1px" }}
                  sx={{
                    width: "10px",
                    backgroundColor: "#8189FF",
                    color: "#FFFFFF",
                    fontSize: "20px",
                  }}
                  text="Go"
                  onClick={pageChangedClickHandler}
                />
              </Box>
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default Table;
