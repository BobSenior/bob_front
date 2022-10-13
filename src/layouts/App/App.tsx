import React, { lazy } from "react";
import "../../pages/Apple/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Main = lazy(() => import("../../layouts/Main"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
