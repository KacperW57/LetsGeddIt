import { Box, Stack } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";

import BottomNav from "./MainSiteComponents/BottomNav";

import LeftSidebar from "./MainSiteComponents/LeftSidebar";
import NavBar from "./MainSiteComponents/NavBar";
import Posts from "./MainSiteComponents/Posts";
import RightSidebar from "./MainSiteComponents/RightSidebar";
import SinglePost from "./MainSiteComponents/SinglePost";
import SingleUser from "./MainSiteComponents/SingleUser";
import Users from "./MainSiteComponents/Users";

export default function MainSite() {
  const login = localStorage.getItem("login");

  return (
    <Box>
      <NavBar login={login} />

      <Stack direction="row" justifyContent="space-between">
        <LeftSidebar login={login} />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<SingleUser />} />
          <Route path="/posts" element={<Posts login={login} />} />
          <Route path="/posts/:id" element={<SinglePost />} />
        </Routes>
        <RightSidebar />
        <BottomNav login={login} />
      </Stack>
      <BottomNav />
    </Box>
  );
}
