import React, { lazy } from "react";
import "../../pages/Apple/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Apple = lazy(() => import("../../pages/Apple/Apple"));
const Main = lazy(() => import("../../layouts/Main"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/apple" element={<Apple />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
