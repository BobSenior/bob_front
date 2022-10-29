import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./pages/Loading";

const MainLayout = lazy(() => import("./layouts/Main"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/LogIn"));
const Signup = lazy(() => import("./pages/SignUp"));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"signup"} element={<Signup />} />
        <Route path={"main/*"} element={<MainLayout />} />
        <Route path={"test"} element={<Loading />} />
        <Route path={"*"} element={<div>404 error</div>} />
      </Routes>
    </Suspense>
  );
};

export default App;
