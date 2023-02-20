import { ArrowBack } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SinglePost() {
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState();
  const { current: myArray } = useRef(["one", "two", "three"]);

  useEffect(() => {
    async function getUser() {
      const response = await fetch(`http://localhost:5000/posts/${params.id}`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const post = await response.json();
      setPost(post);
    }

    getUser();

    console.log(post);
  }, [myArray]);

  if (post === undefined) {
    return (
      <Box
        flex={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="p" m="2vw">
          Loading post...
        </Typography>
      </Box>
    );
  } else if (post !== undefined) {
    return (
      <Box
        flex={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card
          key={post._id}
          sx={{ width: "100%", margin: "1vw", position: "relative" }}
          elevation={8}
        >
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
          <Fab
            variant="extended"
            sx={{
              position: "absolute",
              right: "1vw",
              top: "1vw",
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBack />
            Back
          </Fab>
        </Card>
      </Box>
    );
  }
}
