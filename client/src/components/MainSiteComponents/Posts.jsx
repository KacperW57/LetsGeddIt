import {
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Posts(props) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  async function deletePost(id) {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const newPosts = posts.filter((el) => el.id !== id);
    setPosts(newPosts);
    console.log("post deleted");
  }

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`http://localhost:5000/posts`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const posts = await response.json();
      setPosts(posts);
    }

    getPosts();
    return;
  }, [posts.length]);
  const postsListAdmin = posts.map((post) => {
    return (
      <Card key={post._id} sx={{ width: "100%", margin: "1vw" }} elevation={8}>
        <CardContent>
          <Stack direction="row" alignItems="center">
            <Typography variant="p" fontWeight={300} m="1vw">
              Added by:
            </Typography>
            <Avatar sx={{ margin: "5px" }}>{post.login.charAt(0)}</Avatar>
            <Typography variant="span" fontWeight={500} m="1vw">
              {post.login}
            </Typography>
            <Typography variant="p" fontWeight={300} m="1vw">
              {post.postAdd_date}
            </Typography>
          </Stack>
          <Typography m="2vw">{post.post}</Typography>
          <Stack justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/mainSite/posts/${post._id}`);
              }}
            >
              Post page
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ margin: "1vw" }}
              onClick={() => {
                deletePost(post._id);
              }}
            >
              Delete post
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  });
  const postsList = posts.map((post) => {
    return (
      <Card key={post._id} sx={{ width: "100%", margin: "1vw" }} elevation={8}>
        <CardContent>
          <Stack direction="row" alignItems="center">
            <Typography variant="p" fontWeight={300} m="1vw">
              Added by:
            </Typography>
            <Avatar sx={{ margin: "5px" }}>{post.login.charAt(0)}</Avatar>
            <Typography variant="span" fontWeight={500} m="1vw">
              {post.login}
            </Typography>
            <Typography variant="p" fontWeight={300} m="1vw">
              {post.postAdd_date}
            </Typography>
          </Stack>
          <Typography m="2vw">{post.post}</Typography>
          <Stack justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/mainSite/posts/${post._id}`);
              }}
            >
              Post page
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  });
  if (localStorage.getItem("login") === "Admin") {
    return (
      <Box flex={4} display="flex">
        <Stack direction="column" sx={{ width: "90%" }}>
          {postsListAdmin}
        </Stack>
      </Box>
    );
  } else {
    return (
      <Box flex={4} display="flex">
        <Stack direction="column" sx={{ width: "90%" }}>
          {postsList}
        </Stack>
      </Box>
    );
  }
}
