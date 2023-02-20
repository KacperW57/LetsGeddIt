import { LockPerson } from "@mui/icons-material";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";

export default function Register() {
  const [pwdCol, setPwdCol] = useState("white");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    login: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  function pwdColor() {
    if (form.password === form.repeatPassword) {
      setPwdCol("white");
    } else if (form.password !== form.repeatPassword) {
      setPwdCol("rgba(255, 0, 0, 0.35)");
    }
  }

  useEffect(() => {
    pwdColor();
  });

  async function handleSubmit(e) {
    if (form.password === form.repeatPassword) {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/register", {
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
        setForm({
          login: "",
          email: "",
          password: "",
          repeatPassword: "",
        });
        console.log("Account added!");

        navigate("/mainSite/posts");
      } else if (!response.ok) {
        alert("Login already taken!");
      }
    } else {
      alert("Passwords are not matching!");
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
                  Make an account
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Stack m="2vw" justifyContent="center" alignItems="center">
                    <TextField
                      id="login"
                      label="Login"
                      variant="outlined"
                      sx={{ margin: "5px" }}
                      required
                      aria-label="required"
                      onChange={(e) => updateForm({ login: e.target.value })}
                    />
                    <TextField
                      id="email"
                      label="E-mail"
                      variant="outlined"
                      sx={{ margin: "5px" }}
                      required
                      aria-label="required"
                      onChange={(e) => updateForm({ email: e.target.value })}
                    />
                    <TextField
                      type="password"
                      id="password"
                      label="Password"
                      variant="outlined"
                      sx={{ margin: "5px" }}
                      required
                      aria-label="required"
                      onChange={(e) => updateForm({ password: e.target.value })}
                    />
                    <TextField
                      type="password"
                      id="repeatPassword"
                      label="Repeat Password"
                      variant="outlined"
                      sx={{
                        margin: "5px",
                        backgroundColor: `${pwdCol}`,
                        borderRadius: "5px",
                      }}
                      required
                      aria-label="required"
                      onChange={(e) =>
                        updateForm({ repeatPassword: e.target.value })
                      }
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ margin: "1vw" }}
                    >
                      Register
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ margin: "1vw" }}
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Back to login screen
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Paper>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
