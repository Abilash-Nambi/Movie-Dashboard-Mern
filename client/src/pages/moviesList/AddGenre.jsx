import styled from "@emotion/styled";
import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { CustomButton } from "../../components/CustomButton";

const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  "& .add-genre-container": {
    background: theme.palette.secondary.light,
    padding: theme.spacing(5),
  },
}));

const AddGenre = () => {
  const handleDelete = () => {};
  return (
    <Wrapper>
      <Container maxWidth="sm">
        <Stack spacing={1} className="add-genre-container">
          <Typography variant="caption">Title</Typography>

          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            fullWidth
          />

          <CustomButton
            variant="contained"
            fullWidth
            color="secondary"
            text="Add Genre"
            size="medium"
          />
          <Typography variant="caption">Genre</Typography>
          <Box>
            <Chip
              color="secondary"
              size="medium"
              variant="outlined"
              label="Action"
              onDelete={handleDelete}
            />
          </Box>
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default AddGenre;
