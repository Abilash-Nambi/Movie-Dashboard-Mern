import styled from "@emotion/styled";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CategoryIcon from "@mui/icons-material/Category";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const Wrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.light,
  position: "fixed",
  paddingTop: "4em",
  height: "100vh",
  "& .sidebar-logo": {
    paddingTop: theme.spacing(4),
    fontFamily: "Protest Riot, sans-serif",

    "& .logo-letter-color": {
      color: theme.palette.secondary.main,
    },
  },

  "& .sidebar-menu": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "90%",
  },
  "& .sidebar-menu-responsive": {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

const Sidebar = () => {
  return (
    <Wrapper>
      <Box>
        <Typography variant="h4" className="sidebar-logo" align="center">
          <span className="logo-letter-color">P</span>lay
          <span className="logo-letter-color">M</span>ovies
        </Typography>
      </Box>
      <Box align="center" p={3} className="sidebar-menu">
        <Box>
          <Typography variant="subtitle2">MENU</Typography>
          <Divider />
          <List>
            <Link to="/">
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>

                  <ListItemText
                    primary="Home"
                    className="sidebar-menu-responsive"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/add-movies">
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>{<LiveTvIcon />}</ListItemIcon>

                  <ListItemText
                    primary="Movie"
                    className="sidebar-menu-responsive"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/add-genre">
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>{<CategoryIcon />}</ListItemIcon>

                  <ListItemText
                    primary="Genre"
                    className="sidebar-menu-responsive"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
        <Box>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="LogOut"
                  className="sidebar-menu-responsive"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Sidebar;
