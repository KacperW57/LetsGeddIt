import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NavBar(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h2"
          to="/mainSite/posts"
          component={RouterLink}
          sx={{ margin: "1vw", color: "white", textDecoration: "none" }}
        >
          LetsGeddIt
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          onClick={() => setOpen(true)}
        >
          <Typography
            variant="p"
            m="1vw"
            sx={{ display: { xs: "none", sm: "inline-block" } }}
          >
            {props.login}
          </Typography>
          <Avatar sx={{ backgroundColor: "lightBlue" }}>
            {props.login.charAt(0)}
          </Avatar>
        </Box>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-menu"
          open={open}
          onClose={(e) => setOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.setItem("login", "");
              navigate("/");
            }}
          >
            Log Out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
