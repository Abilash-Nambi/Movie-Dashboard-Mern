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

import { MOVIE_API_URL, USER_API_URL } from "../../constants/const";
import axios from "axios";
import Chip from "@mui/material/Chip";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MoviesWatchLater = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState((prev) => ({ ...prev, open: false }));
  };
  // console.log("🚀 + MoviesWatchLater + allMovies:", allMovies);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    let userData = JSON.parse(localStorage.getItem("movieDb"));
    try {
      const res = await axios.get(
        `${USER_API_URL}/watchList?userId=${userData.userId}`
      );
      setAllMovies(res.data);
    } catch (error) {
      // console.log("🚀 + fetchGenres + error:", error);
    }
  };

  const removeMovie = (id) => {
    console.log("🚀 + removeMovie + id:", id);
  };

  return (
    <Box paddingTop={5}>
      <Container>
        <Grid container spacing={2} pt={7}>
          {allMovies[0]?.movies.length >= 1 ? (
            allMovies[0]?.movies?.map((data) => (
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
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Deserunt saepe recusandae rerum omnis,
                        </Typography>
                        <Box>
                          {data?.genre?.map((data) => (
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

                      {/*  <Link to="/movies-watchlater"> */}
                      <Button
                        variant="outlined"
                        color="success"
                        startIcon={<HighlightOffIcon />}
                        onClick={() => removeMovie(data._id)}
                      >
                        remove movie
                      </Button>
                      {/* </Link> */}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))
          ) : (
            <Box sx={{ width: 500 }}>
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={true}
                onClose={handleClose}
                message="No Watch list"
                key={vertical + horizontal}
              />
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default MoviesWatchLater;
