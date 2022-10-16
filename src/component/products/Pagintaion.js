import { Pagination } from "@mui/material";
import React from "react";

const PaginationComponent = ({ page, setPage, totalPages }) => {
  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={(_, value) => {
        setPage({ page: +value });
      }}
    />
  );
};

export default PaginationComponent;
