import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./pages/Loading";
import { AnimatePresence } from "framer-motion";
import AppointmentLayout from "./layouts/AppointmentLayout";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/SignUp"));
const FindingIdPw = lazy(() => import("./pages/FindingIdPw"));

const App = () => {
  return (
    <AnimatePresence>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"login"} element={<Login />} />
          <Route path={"signup"} element={<Signup />} />
          <Route path={"main/*"} element={<MainLayout />} />
          <Route path={"appointment/*"} element={<AppointmentLayout />}/>
          <Route path={"test"} element={<Loading />} />
          <Route path={"*"} element={<div>404 error</div>} />
          <Route path={"finding"} element={<FindingIdPw />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default App;
