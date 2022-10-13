import React, { lazy } from "react";
import { Body, Header, Profile } from "./style";
import { Route, Routes } from "react-router-dom";

const Apple = lazy(() => import("../../pages/Apple/Apple"));

const Main = () => {
  return (
    <div>
      <Header>
        <span>밥선배</span>
        <Profile></Profile>
      </Header>
      <Body>
        <Routes>
          <Route path={"/"} element={<Apple />} />
        </Routes>
      </Body>
    </div>
  );
};

export default Main;
