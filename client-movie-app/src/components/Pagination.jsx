import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

export default function PaginationControlled({
  page,
  handleChange,
  totalPage,
}) {
  return (
    <Stack spacing={2}>
      <Box>
        <Typography>Page: {page}</Typography>
        <Pagination count={totalPage} page={page} onChange={handleChange} />
      </Box>
    </Stack>
  );
}
