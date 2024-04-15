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
import { MOVIE_API_URL, USER_API_URL } from "../../constants/const";
import axios from "axios";
import Chip from "@mui/material/Chip";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import MultipleSelectChip from "../../components/FilterMovies";
import PaginationControlled from "../../components/Pagination";
import { ToastContainer, toast } from "react-toastify";
const MoviesListing = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [filterMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);

  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchMovies();
  // }, []);

  useEffect(() => {
    fetchFilteredMovies();
  }, [selectedGenre, page]);

  // const fetchMovies = async () => {
  //   try {
  //     const res = await axios.get(MOVIE_API_URL);
  //     setAllMovies(res.data);
  //     //console.log("🚀 + fetchGenres + res.data:", res.data);
  //   } catch (error) {
  //     console.log("🚀 + fetchGenres + error:", error);
  //   }
  // };

  const addToWatchLater = async (id) => {
    console.log(id);
    let isLoggedIn = JSON.parse(localStorage.getItem("movieDb"));
    if (!isLoggedIn || !isLoggedIn.token) {
      navigate("/sign-in");
    } else {
      //navigate("/movies-watchlater");
      try {
        const userId = isLoggedIn.userId;
        const response = axios.put(
          `${USER_API_URL}/addToWatchLater?userId=${userId}`,
          {
            data: { movieId: id },
          },
          { headers: { Authorization: isLoggedIn.token } }
        );
        notifySuccess("Movie Added To Watchlater");
        console.log("🚀 + watchLater + response:", response);
      } catch (error) {
        console.log("🚀 + watchLater + error:", error);
        notifyErr(error.response.data.message);
      }
    }
  };
  const notifyErr = (mes) => toast.error(mes);
  const notifySuccess = (mes) => toast.success(mes, { autoClose: 5000 });

  const fetchFilteredMovies = async () => {
    try {
      const res = await axios.post(`${MOVIE_API_URL}/filter?page=${page}`, {
        data: selectedGenre,
      });
      setFilteredMovies(res.data.movieList);
      setTotalPage(res.data.totalPage);
      console.log("🚀 + fetchFilteredMovies + res:", res.data.totalPage);
      // setFilteredMovies(res.data.MovieList);
    } catch (error) {
      console.log("🚀 + fetchGenres + error:", error);
    }
  };

  return (
    <Box paddingTop={5}>
      <Container>
        <Box pt={7} textAlign="right">
          <MultipleSelectChip
            fetchFilteredMovies={fetchFilteredMovies}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        </Box>
        <Grid container spacing={2} pt={7}>
          {filterMovies?.map((data) => (
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

                    {/*  <Link to="/movies-watchlater"> */}
                    <Button
                      variant="outlined"
                      color="success"
                      startIcon={<AddHomeIcon />}
                      onClick={() => addToWatchLater(data._id)}
                    >
                      Watch Later
                    </Button>
                    {/* </Link> */}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box pt={7}>
          <PaginationControlled
            page={page}
            handleChange={handleChange}
            totalPage={totalPage}
          />
        </Box>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default MoviesListing;
