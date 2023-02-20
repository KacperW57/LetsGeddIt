import { ArrowBack } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

export default function SingleUser() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState();
  const { current: myArray } = useRef(["one", "two", "three"]);

  useEffect(() => {
    async function getUser() {
      const response = await fetch(`http://localhost:5000/users/${params.id}`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const user = await response.json();
      setUser(user);
    }

    getUser();

    console.log(user);
  }, [myArray]);

  if (user === undefined) {
    return (
      <Box
        flex={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="p" m="2vw">
          Loading user...
        </Typography>
      </Box>
    );
  } else if (user !== undefined) {
    return (
      <Box
        flex={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card sx={{ width: "100%", margin: "1vw" }} elevation={8}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Stack direction="row" justifyItems="center" alignItems="center">
              <Stack justifyContent="center" alignItems="center">
                <Typography variant="p" fontWeight={300} m="1vw">
                  User:
                </Typography>
                <Avatar sx={{ margin: "5px" }}>{user.login.charAt(0)}</Avatar>
                <Typography variant="span" fontWeight={500} m="1vw">
                  {user.login}
                </Typography>
                <Typography variant="p" fontWeight={300} m="1vw">
                  Joined:
                </Typography>
                <Typography variant="p" fontWeight={300} m="1vw">
                  {user.registration_date}
                </Typography>

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
              </Stack>
            </Stack>
            <Typography m="2vw">{user.user}</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }
}
