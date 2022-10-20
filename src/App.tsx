import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const MainLayout = lazy(() => import("./layouts/Main"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Main = lazy(() => import("./pages/Promises"));
const Login = lazy(() => import("./pages/Login"));
const MyPlans = lazy(() => import("./pages/MyPlans"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        }
      >
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"login"} element={<Login />} />
          {/*<Route path={"signUp"} element={<SignUp />} />*/}
          <Route path={"main"} element={<MainLayout />}>
            <Route path={""} element={<Main />} />
            <Route path={"profile"} element={<Profile />} />
            <Route path={"plans"} element={<MyPlans />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
