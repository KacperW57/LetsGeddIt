import React from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LockPerson } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LogIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    console.log(response);
    if (response.ok) {
      localStorage.setItem("login", form.login);
      navigate("/mainSite/posts");
    } else if (!response.ok) {
      alert("Wrong Login or Password!");
    }
  }

  return (
    <Box sx={{ backgroundColor: "lightBlue" }}>
      <Stack
        sx={{
          jutifyContent: "center",
          height: "100vh",
          width: {
            xs: "100%",
            sm: "70%",
          },
          marginLeft: {
            xs: 0,
            sm: "15%",
          },
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        >
          <Typography
            flex={1}
            variant="h3"
            width="80%"
            ml="10%"
            mt="10vh"
            mb="10vh"
            sx={{
              textAlign: "center",
              justifySelf: "center",
            }}
          >
            Welcome to LetsGeddIt!
          </Typography>

          <Stack>
            <Paper
              elevation={8}
              sx={{
                justifyContent: "center",
                width: { xs: "80%", sm: "60%" },
                marginLeft: { xs: "10%", sm: "20%" },
              }}
            >
              <Stack m="2vw" justifyContent="center" alignItems="center">
                <LockPerson sx={{ alignSelf: "center" }} />
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Sign in
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Stack m="2vw" justifyContent="center" alignItems="center">
                    <TextField
                      id="login"
                      label="Login"
                      variant="outlined"
                      sx={{ margin: "5px" }}
                      required
                      aria-label="rerquired"
                      onChange={(e) => updateForm({ login: e.target.value })}
                    />
                    <TextField
                      type="password"
                      id="password"
                      label="Password"
                      variant="outlined"
                      sx={{ margin: "5px" }}
                      required
                      aria-label="rerquired"
                      onChange={(e) => updateForm({ password: e.target.value })}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ margin: "1vw" }}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </form>
                <Stack m={2} justifyContent="center" alignItems="center">
                  <Typography variant="p" m="1vw" sx={{ textAlign: "center" }}>
                    You don't have an account?{" "}
                    <Button component={RouterLink} to="/Register">
                      Register
                    </Button>
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
