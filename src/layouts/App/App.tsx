import React from "react";
import "../../pages/Apple/App.css";
import { Route, Routes } from "react-router";
import Apple from "../../pages/Apple/Apple";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Apple />} />
    </Routes>
  );
}

export default App;
