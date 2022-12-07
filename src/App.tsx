import "react-toastify/dist/ReactToastify.css";
import React, { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./pages/Loading";
import { AnimatePresence } from "framer-motion";
import GlobalContext from "./hooks/GlobalContext";
import { MyDataDTO } from "./types/db";
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/SignUp"));
const FindingIdPw = lazy(() => import("./pages/FindingIdPw"));

const App = () => {
  const [myData, setMyData] = useState<MyDataDTO | undefined>(undefined);
  return (
    <GlobalContext.Provider
      value={{
        myData,
        setMyData,
      }}
    >
      <AnimatePresence>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"login"} element={<Login />} />
            <Route path={"signup"} element={<Signup />} />
            <Route path={"main/*"} element={<MainLayout />} />
            <Route path={"*"} element={<div>404 error!</div>} />
            <Route path={"finding"} element={<FindingIdPw />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </GlobalContext.Provider>
  );
};

export default App;
