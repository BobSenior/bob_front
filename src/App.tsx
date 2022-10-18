import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/Main";
import Home from "./pages/Home";
import Apple from "./pages/Apple/Apple";
import MyPromises from "./pages/MyPromises";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"main"} element={<MainLayout />}>
          <Route path={""} element={<Main />} />
          <Route path={"profile"} element={<Profile />} />
          <Route path={"mypromises"} element={<MyPromises />} />
          <Route path={"apple"} element={<Apple />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
