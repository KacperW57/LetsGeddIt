import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Users() {
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
    console.log(users);
    return;
  });

  const usersList = users.map((user) => {
    return (
      <Card key={user._id} sx={{ width: "100%", margin: "1vw" }} elevation={8}>
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
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
            </Stack>
          </Stack>
          <Typography m="2vw">{user.user}</Typography>
        </CardContent>
      </Card>
    );
  });
  return (
    <Box flex={4} display="flex">
      <Stack direction="column" sx={{ width: "90%" }}>
        {usersList}
      </Stack>
    </Box>
  );
}
