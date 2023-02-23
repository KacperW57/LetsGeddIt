import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";

export default function RightSidebar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://localhost:5000/users`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const users = await response.json();
      setUsers(users);
    }

    getUsers();
    return;
  }, [users.length]);

  const avatarGroup = users.map((user) => {
    return <Avatar key={user._id}>{user.login.charAt(0)}</Avatar>;
  });
  return (
    <Box flex={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <Stack direction="column" justifyContent="center">
          <Typography variant="h4" textAlign="center" m="1vw">
            All users:
          </Typography>
          <AvatarGroup max={4} sx={{ margin: "2vw" }}>
            {avatarGroup}
          </AvatarGroup>
          <Card sx={{ margin: "1vw" }} elevation={5}>
            <CardContent>
              <Stack direction="column" justifyContent="center">
                <Typography variant="h5" textAlign="center" m="1vw">
                  Informations:
                </Typography>
                <Typography variant="p" textAlign="center" m="1vw">
                  LetsGeddIt is a social media app, where you can share your
                  thoughts with your friends and other people.
                </Typography>
                <Typography variant="p" textAlign="center" m="1vw">
                  To find people go to users tab.
                </Typography>
                <Typography variant="p" textAlign="center" m="1vw">
                  To see posts go to home tab.
                </Typography>
                <Typography variant="p" textAlign="center" m="1vw">
                  To add posts click add Post
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}
