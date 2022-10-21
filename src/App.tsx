import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./pages/Loading";

const MainLayout = lazy(() => import("./layouts/Main"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Main = lazy(() => import("./pages/Promises"));
const Login = lazy(() => import("./pages/Login"));
const MyPlans = lazy(() => import("./pages/MyPlans"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
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
