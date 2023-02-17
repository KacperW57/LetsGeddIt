import { Typography, Box, Card, CardContent, Avatar } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";

export default function Posts(props) {
  const [posts, setPosts] = useState([]);

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
    console.log(posts);
    return;
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
        </CardContent>
      </Card>
    );
  });
  return (
    <Box flex={4} display="flex">
      <Stack direction="column" sx={{ width: "90%" }}>
        {postsList}
      </Stack>
    </Box>
  );
}
