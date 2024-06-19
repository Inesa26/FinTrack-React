import { Pagination, Stack } from "@mui/material";
import * as React from "react";

interface PaginationRoundedProps {
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const PaginationRounded: React.FC<PaginationRoundedProps> = ({
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={onPageChange}
        variant="outlined"
        color="primary"
      />
    </Stack>
  );
};

export default PaginationRounded;
