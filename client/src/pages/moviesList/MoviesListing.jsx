import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import image from "../../assets/avengersendgame_lob_crd_05_2.jpg";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

const MoviesListing = () => {
  return (
    <Box paddingTop={5}>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Paper variant="outlined">
              <Grid container>
                <Grid item md={6} p={2}>
                  <img
                    src={image}
                    alt="moviepicture"
                    width="150px"
                    //height="250px"
                  />
                </Grid>
                <Grid item md={6} p={2}>
                  <Typography>Marvel</Typography>
                  <Typography variant="caption">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deserunt saepe recusandae rerum omnis,
                  </Typography>
                  <Typography>genre</Typography>
                  <Rating name="read-only" value={4} readOnly size="small" />
                  <Box align="right">
                    <IconButton>
                      <ModeEditOutlinedIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MoviesListing;
