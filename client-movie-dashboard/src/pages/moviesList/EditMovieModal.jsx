import React, { useEffect, useState } from "react";
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
import Modal from "@mui/material/Modal";
import Slider from "@mui/material/Slider";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import {
  CLOUDINARY_IMAGE_UPLOAD_URL,
  GENRE_API_URL,
  MOVIE_API_URL,
} from "../../constants/const";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function BasicModal({
  open,
  setOpen,
  handleOpen,
  title,
  setSingleMovieData,
  singleMovieData,
}) {
  const CLOUD_NAME = "dzdzx6lek";
  const CLOUDINARY_UPLOAD_PRESET = "ml_default";

  // const [imageUrl, setImageUrl] = useState("");
  // const [movieTitle, setMovieTitle] = useState("");
  // const [rating, setRating] = React.useState(0);

  const [allGenres, setAllGenres] = useState([]);
  const [checkedGenre, setCheckedGenre] = useState({ payCCFee: false });
  const [selectedGenre, setSelectedGenre] = useState([]);
  // console.log("🚀 + selectedGenre:", selectedGenre);

  const handleClose = () => setOpen(false);

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
          setSingleMovieData((prev) => ({
            ...prev,
            imageName: uploadedFileUrl,
          }));
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
      setAllGenres(res.data);
      // //console.log("🚀 + fetchGenres + res.data:", res.data);
      setCheckedGenre(Array(res.data.length).fill(false));
    } catch (error) {
      // console.log("🚀 + fetchGenres + error:", error);
    }
  };

  useEffect(() => {
    if (singleMovieData.genre && singleMovieData.genre.length > 0) {
      const newCheckedState = Array(allGenres.length).fill(false);
      const selectedGenres = [];
      singleMovieData.genre.forEach((genreId) => {
        const index = allGenres.findIndex((genre) => genre._id === genreId._id);
        if (index !== -1) {
          newCheckedState[index] = true;
          selectedGenres.push(genreId._id);
        }
      });
      setSelectedGenre(selectedGenres);
      setCheckedGenre(newCheckedState);
    } else {
      const newCheckedState = Array(allGenres.length).fill(false);
      setCheckedGenre(newCheckedState);
    }
  }, [allGenres, singleMovieData?.genre]);

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
  const handleUpdateMovie = async () => {
    try {
      const movieData = {
        title: singleMovieData.title,
        imageName: singleMovieData.imageName,
        rating: singleMovieData.rating,
        genre: selectedGenre,
        _id: singleMovieData._id,
      };
      const res = await axios.put(`${MOVIE_API_URL}/updateMovie`, movieData);
      notify("Movie Updated Successfully");
      setTimeout(() => {
        setOpen(false);
      }, 1000);
      // // // console.log("🚀 + handleAddMovie + res:", res);
    } catch (error) {
      // console.log("🚀 + fetchGenres + error:", error);
    }
  };
  const notify = (mes) => toast(mes);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>

          <Stack spacing={1} className="add-movies-container">
            <Typography variant="caption">
              <label htmlFor="movie-image"></label>
            </Typography>
            <img
              src={singleMovieData.imageName}
              className="add-movies-image"
              alt="Movie Image"
              style={{ width: 100, height: 100, objectFit: "cointain" }}
            />
            <Button variant="contained" component="label" color="secondary">
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => handleChangeImage(e)}
              />
            </Button>

            <Typography variant="caption">Title</Typography>
            <CustomInput
              label="Title"
              variant="outlined"
              onChange={(e) =>
                setSingleMovieData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              value={singleMovieData.title}
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
              value={singleMovieData.rating}
              onChange={(e) =>
                setSingleMovieData((prev) => ({
                  ...prev,
                  rating: e.target.value,
                }))
              }
            />
            <Typography variant="caption">Genre</Typography>
            <Box>
              <FormGroup
                className="add-movies-genre"
                sx={{ display: "flex", flexDirection: "row" }}
              >
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
                text="Update"
                size="medium"
                onClick={handleUpdateMovie}
              />
            </Box>
          </Stack>
          <ToastContainer position="top-center" />
        </Box>
      </Modal>
    </div>
  );
}
