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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    setAnchorEl(null);
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
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
};

export default Header;
