import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import image from "../../assets/avengersendgame_lob_crd_05_2.jpg";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { MOVIE_API_URL } from "../../constants/const";
import axios from "axios";
import Chip from "@mui/material/Chip";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { Link } from "react-router-dom";
const MoviesListing = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [singleMovieData, setSingleMovieData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    fetchMovies();
  }, [open]);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(MOVIE_API_URL);
      setAllMovies(res.data);
      console.log("🚀 + fetchGenres + res.data:", res.data);
    } catch (error) {
      console.log("🚀 + fetchGenres + error:", error);
    }
  };

  const deleteMovies = async (id) => {
    try {
      const res = await axios.delete(`${MOVIE_API_URL}/deleteMovie`, {
        data: { _id: id },
      });
      fetchMovies();
    } catch (error) {
      console.log("🚀 + fetchGenres + error:", error);
    }
  };

  const fetchSingleMovie = async (id) => {
    try {
      const res = await axios.get(`${MOVIE_API_URL}/singleMovie/${id}`);
      setSingleMovieData(res.data);
      // // // //console.log("🚀 + fetchGenres + res.data:", res.data);
      //setCheckedGenre(Array(res.data.length).fill(false));
    } catch (error) {
      console.log("🚀 + fetchGenres + error:", error);
    }
  };

  return (
    <Box paddingTop={5}>
      <Container>
        <Grid container spacing={2} pt={7}>
          {allMovies.map((data) => (
            <Grid item md={4} xs={12}>
              <Paper variant="outlined" sx={{ minHeight: "100%" }}>
                <Grid container>
                  <Grid item md={6} p={2}>
                    <img
                      src={data.imageName}
                      alt="moviepicture"
                      style={{
                        maxWidth: "100%",
                        minHeight: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Grid>
                  <Grid item md={6} p={2}>
                    <Box sx={{ minHeight: "260px" }}>
                      <Typography variant="h5">{data.title}</Typography>
                      <Typography variant="caption">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deserunt saepe recusandae rerum omnis,
                      </Typography>
                      <Box>
                        {data.genre.map((data) => (
                          <Chip
                            label={data.title}
                            color="success"
                            size="small"
                            sx={{ marginRight: "5px" }}
                          />
                        ))}
                      </Box>

                      <Rating
                        name="read-only"
                        value={data.rating}
                        readOnly
                        size="small"
                        sx={{ marginTop: "3px" }}
                      />
                      <Box align="right">
                        {/* <IconButton>
                        <ModeEditOutlinedIcon
                          onClick={() => {
                            handleOpen();
                            fetchSingleMovie(data._id);
                          }}
                        />
                      </IconButton>
                      <IconButton>
                        <DeleteOutlinedIcon
                          onClick={() => deleteMovies(data._id)}
                        />
                      </IconButton> */}
                      </Box>
                    </Box>

                    <Link to="/movies-watchlater">
                      <Button
                        variant="outlined"
                        color="success"
                        startIcon={<AddHomeIcon />}
                      >
                        Watch Later
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MoviesListing;
