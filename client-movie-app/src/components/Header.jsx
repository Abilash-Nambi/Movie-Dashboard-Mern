import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

const Wrapper = styled(Box)(({ theme }) => ({
  "& .MuiToolbar-root": {
    background: theme.palette.secondary.light,
  },
  "& .sidebar-logo": {
    paddingTop: theme.spacing(1),
    fontFamily: "Protest Riot, sans-serif",

    "& .logo-letter-color": {
      color: theme.palette.secondary.main,
    },
  },
}));
const Header = () => {
  return (
    <Wrapper>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h4" className="sidebar-logo" align="center">
              <span className="logo-letter-color">P</span>lay
              <span className="logo-letter-color">M</span>ovies App
            </Typography>
          </Box>

          <Box>
            <IconButton size="large" color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={4} color={"secondary"}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
};

export default Header;
