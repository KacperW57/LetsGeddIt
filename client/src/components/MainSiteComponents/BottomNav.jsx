import { Add, Home, Person } from "@mui/icons-material";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function BottomNav(props) {
  const [post, setPost] = useState({
    login: `${props.login}`,
    post: "",
  });

  function updatePost(value) {
    return setPost((prev) => {
      return { ...prev, ...value };
    });
  }
  async function uploadPost() {
    await fetch("http://localhost:5000/addPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    console.log("Post added");

    setOpen(false);
  }

  const [open, setOpen] = useState(false);
  const login = localStorage.getItem("login");
  return (
    <Paper
      elevation={5}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", sm: "none" },
      }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Homepage"
          component={RouterLink}
          to="/mainSite/posts"
          icon={<Home />}
        />
        <BottomNavigationAction
          label="Add Post"
          onClick={() => {
            setOpen(true);
          }}
          icon={<Add />}
        />
        <BottomNavigationAction
          label="Users"
          component={RouterLink}
          to="/mainSite/users"
          icon={<Person />}
        />
      </BottomNavigation>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        position="fixed"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="column"
          width={400}
          height={250}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6" color="Gray">
            Create post
          </Typography>
          <Stack direction="row" alignItems="center">
            <Avatar sx={{ margin: "5px" }}>{login.charAt(0)}</Avatar>
            <Typography variant="span" fontWeight={500} m="5px">
              {login}
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              id="standard-multiline-static"
              multiline
              rows={4}
              placeholder="Your post"
              variant="standard"
              sx={{ width: "100%", margin: "1vw" }}
              onChange={(e) => updatePost({ post: e.target.value })}
            ></TextField>
            <Button
              onClick={() => {
                uploadPost();
              }}
              variant="contained"
              sx={{ margin: "1vw" }}
            >
              Post
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Paper>
  );
}
