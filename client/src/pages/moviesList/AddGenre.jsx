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
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { CustomButton } from "../../components/CustomButton";
import axios from "axios";
import {
  CLOUDINARY_IMAGE_UPLOAD_URL,
  GENRE_API_URL,
  MOVIE_API_URL,
} from "../../constants/const";
import { ToastContainer, toast } from "react-toastify";

const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  "& .add-genre-container": {
    background: theme.palette.secondary.light,
    padding: theme.spacing(5),
  },
}));

const AddGenre = () => {
  const [allGenres, setAllGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  console.log("🚀 + AddGenre + newGenre:", newGenre);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const res = await axios.get(GENRE_API_URL);
      setAllGenres(res.data);
    } catch (error) {
      console.log("🚀 + fetchGenres + error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${GENRE_API_URL}/deleteGenre/${id}`);
      fetchGenres();
      notify("Genre Deleted Successfully");
    } catch (error) {
      console.log("🚀 + fetchGenres + error:", error.response);
      notify(error.response.data.message);
    }
  };
  const handleAddGenre = async () => {
    try {
      const res = await axios.post(`${GENRE_API_URL}/addGenres`, {
        data: newGenre,
      });
      fetchGenres();
      notify("Genre Added Successfully");
      setNewGenre("");

      // // console.log("🚀 + handleAddMovie + res:", res);
    } catch (error) {
      console.log("🚀 + fetchGenres + error:", error.response);
      notify(error.response.data.message);
    }
  };

  const notify = (mes) => toast(mes);
  return (
    <Wrapper>
      <Container maxWidth="sm">
        <Stack spacing={1} className="add-genre-container">
          <Typography variant="caption">Genre</Typography>

          <TextField
            id="outlined-basic"
            label="Genre"
            variant="outlined"
            fullWidth
            onChange={(e) => setNewGenre(e.target.value)}
            value={newGenre}
          />

          <CustomButton
            variant="contained"
            fullWidth
            color="secondary"
            text="Add Genre"
            size="medium"
            onClick={handleAddGenre}
          />
          <Typography variant="caption">Genre</Typography>
          <Box>
            {allGenres.map((data) => (
              <Chip
                sx={{ marginX: "5px", marginY: "5px" }}
                color="secondary"
                size="medium"
                variant="outlined"
                label={data.title}
                onDelete={() => handleDelete(data._id)}
              />
            ))}
          </Box>
        </Stack>
        <ToastContainer />
      </Container>
    </Wrapper>
  );
};

export default AddGenre;
