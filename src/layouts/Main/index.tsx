import React from "react";
import { Body, Header, Profile } from "./style";

const Main = () => {
  return (
    <div>
      <Header>
        <div>
          <span>밥선배</span>
          <Profile></Profile>
        </div>
      </Header>
      <Body></Body>
    </div>
  );
};

export default Main;
