import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Box, Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  return (
    <Box>
      <Grid container>
        {/* <Grid item md={2} xs={5}>
          <Sidebar />
        </Grid> */}
        <Grid item md={12}>
          <Header />
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RootLayout;
