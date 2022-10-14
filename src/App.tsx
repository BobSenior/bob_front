import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./layouts/HomeLayout";
import Apple from "./pages/Apple/Apple";
import MyPromises from "./pages/MyPromises";
import Profile from "./pages/Profile";
import Main from "./pages/Main";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Navigate replace to={"main"} />} />
        <Route path={"home"} element={<Home />} />
        <Route path={"/"} element={<MainLayout />}>
          <Route path={"main"} element={<Main />} />
          <Route path={"profile"} element={<Profile />} />
          <Route path={"mypromises"} element={<MyPromises />} />
          <Route path={"apple"} element={<Apple />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
