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
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
  "& .MuiPopover-paper": {
    top: "67px",
    left: "634px",
  },
}));
const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [show, setShow] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    isLoggedIn();
  }, []);

  const isLoggedIn = () => {
    let isLoggedIn = JSON.parse(localStorage.getItem("movieDb"));
    if (!isLoggedIn || !isLoggedIn.token) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    localStorage.clear();
    navigate("/sign-in");
  };
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
          {show && (
            <Box>
              <Link to="/movies-watchlater">
                <Button
                  variant="outlined"
                  color="success"
                  startIcon={<WatchLaterIcon />}
                  //onClick={() => addToWatchLater(data._id)}
                  size="small"
                >
                  Watch later list
                </Button>
              </Link>
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
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                sx={{ top: "50px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
};

export default Header;
