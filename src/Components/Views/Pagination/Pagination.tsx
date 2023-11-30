import React, { useState, useEffect } from "react";
import { Pagination as MuiPagination, Stack } from "@mui/material";
import { IProps } from "./Pagination.types";

const Pagination = ({
  data=[],
  itemsPerPage,
  getcurrentdata,
  getcurrentPage,
  getlastindex,
  CurrentPagevalue,
  sx,
}: IProps & React.ComponentProps<typeof MuiPagination>) => {
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data?.length);

  // Get the data for the current page
  const currentPageData = data?.slice(startIndex, endIndex);

  useEffect(() => {
    getlastindex(Math.ceil(data?.length / itemsPerPage));
    getcurrentdata(currentPageData);
    getcurrentPage(currentPage>Math.ceil(data?.length / itemsPerPage)?1:currentPage);
  }, [currentPage, data]);

  useEffect(() => {
    setCurrentPage(CurrentPagevalue);
  }, [CurrentPagevalue]);

  const handlePageChange = (event: any, page: any) => {
    setCurrentPage(page);
    getcurrentdata(currentPageData);
  };
  return (
    <>
      <Stack spacing={2}>
        <MuiPagination
          sx={{
            ...sx,
            "& .MuiPaginationItem-root.Mui-selected": {
              fontWeight: "bold",
            },
          }}
          count={Math.ceil(data?.length / itemsPerPage)}
          page={
            typeof currentPage === "number"
              ? currentPage
              : parseInt(currentPage)
          }
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
};

export default Pagination;
