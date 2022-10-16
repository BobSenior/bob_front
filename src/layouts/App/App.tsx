import React, { lazy } from "react";
import "../../pages/Apple/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";

const Main = lazy(() => import("../../layouts/Main"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
