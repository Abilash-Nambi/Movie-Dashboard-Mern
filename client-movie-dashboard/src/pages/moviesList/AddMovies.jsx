import styled from "@emotion/styled";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import {
  CLOUDINARY_IMAGE_UPLOAD_URL,
  GENRE_API_URL,
  MOVIE_API_URL,
} from "../../constants/const";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingTop: "6em",
  "& .add-movies-container": {
    background: theme.palette.secondary.light,
    padding: theme.spacing(5),
  },
  "& .add-movies-image": {
    maxWidth: "200px",
    minHeight: "100px",
    objectFit: "cover",
  },

  "& .add-movies-genre": {
    display: "flex",
    flexDirection: "row",
  },
}));

const AddMovies = () => {
  const CLOUD_NAME = "dzdzx6lek";
  const CLOUDINARY_UPLOAD_PRESET = "ml_default";
  const [imageUrl, setImageUrl] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [allGenres, setAllGenres] = useState([]);
  const [checkedGenre, setCheckedGenre] = useState({ payCCFee: false });
  const [selectedGenre, setSelectedGenre] = useState([]);
  const navigate = useNavigate();
  // console.log("🚀 + AddMovies + selectedGenre:", selectedGenre);

  // // // console.log("🚀 + AddMovies + movieTitle:", movieTitle);

  const handleChangeImage = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    fetch(CLOUDINARY_IMAGE_UPLOAD_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== "") {
          const uploadedFileUrl = data.secure_url;
          setImageUrl(uploadedFileUrl);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const res = await axios.get(GENRE_API_URL);
      setAllGenres(res.data.data);
      // // // //console.log("🚀 + fetchGenres + res.data:", res.data);
      setCheckedGenre(Array(res.data.length).fill(false));
    } catch (error) {
      // // // console.log("🚀 + fetchGenres + error:", error);
    }
  };

  const handleCheckbox = (index, _id) => {
    const newAnswers = [...checkedGenre];
    newAnswers[index] = !newAnswers[index];
    setCheckedGenre(newAnswers);
    if (newAnswers[index]) {
      setSelectedGenre([...selectedGenre, _id]);
    } else {
      const newGenre = selectedGenre.filter((data) => data !== _id);
      setSelectedGenre(newGenre);
    }
  };
  const handleAddMovie = async () => {
    try {
      const movieData = {
        title: movieTitle,
        imageName: imageUrl,
        rating: rating,
        genre: selectedGenre,
      };
      const res = await axios.post(`${MOVIE_API_URL}/addMovie`, movieData);
      notify("Movie Added Successfully");
      setTimeout(() => {
        navigate(-1);
      }, 3000);

      // // console.log("🚀 + handleAddMovie + res:", res);
    } catch (error) {
      console.log("🚀 + fetchGenres + error:", error.response);
      notify(error.response.data.message);
    }
  };
  const notify = (mes) => toast(mes);

  return (
    <Wrapper>
      <Container maxWidth="md">
        <Stack spacing={1} className="add-movies-container">
          <Typography variant="caption">
            <label htmlFor="movie-image">Image</label>
          </Typography>
          <img src={imageUrl} className="add-movies-image" alt="Movie Image" />
          <Button variant="contained" component="label" color="secondary">
            Upload File
            <input type="file" hidden onChange={(e) => handleChangeImage(e)} />
          </Button>

          <Typography variant="caption">Title</Typography>
          <CustomInput
            label="Title"
            variant="outlined"
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <Typography variant="caption">Rating</Typography>
          <Slider
            disabled={false}
            marks
            max={5}
            min={0}
            size="small"
            valueLabelDisplay="on"
            color="secondary"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <Typography variant="caption">Genre</Typography>
          <Box>
            <FormGroup className="add-movies-genre">
              {allGenres.map((data, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        id={data._id}
                        size="small"
                        color="secondary"
                        onChange={() => handleCheckbox(i, data._id)}
                        checked={checkedGenre[i]}
                      />
                    }
                    label={data.title}
                  />
                );
              })}
            </FormGroup>
          </Box>
          <Box>
            <CustomButton
              variant="contained"
              fullWidth
              color="secondary"
              text="Submit"
              size="medium"
              onClick={handleAddMovie}
            />
          </Box>
        </Stack>
        <ToastContainer />
      </Container>
    </Wrapper>
  );
};

export default AddMovies;
