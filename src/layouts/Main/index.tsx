import React, { useCallback, useState, Suspense, lazy } from "react";
import {
  Body,
  Bottom,
  Header,
  ProfileImg,
  ProfileMenu,
  MainBox,
} from "./style";
const Promises = lazy(() => import("../../pages/Promises"));
const Profile = lazy(() => import("../../pages/Profile"));
const MyPlans = lazy(() => import("../../pages/MyPlans"));
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import gravatar from "gravatar";
import SearchBox from "../../components/SearchBox";
import Loading from "../../pages/Loading";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import Compose from "../../pages/Compose";

const emailExample = "lws6665@naver.com";

const Main = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const onClickProfileImg = useCallback(() => {
    setShowProfileMenu((prevState) => {
      return !prevState;
    });
  }, []);
  const onClickComposeBtn = useCallback(() => {
    setShowProfileMenu(false);
    navigate("compose");
  }, []);
  const onClickProfileBtn = useCallback(() => {
    setShowProfileMenu(false);
    navigate("profile");
  }, []);
  const onClickSearchBtn = useCallback(() => {
    setShowSearchBar((prevState) => {
      return !prevState;
    });
  }, []);
  const onClickLogOut = useCallback(() => {
    setShowProfileMenu(false);
  }, []);

  return (
    <MainBox>
      <Header>
        <span
          onClick={() => {
            navigate("/");
          }}
        >
          밥선배
        </span>

        <ProfileImg
          src={gravatar.url(emailExample, { s: "28px", d: "identicon" })}
          onClick={onClickProfileImg}
        ></ProfileImg>
        {showProfileMenu && (
          <ProfileMenu>
            <LayoutBtn
              text={"새 약속 만들기"}
              fontSize={"1em"}
              height={""}
              width={""}
              onClick={onClickComposeBtn}
              animate={""}
            />
            <LayoutBtn
              text={"프로필 수정"}
              fontSize={"1em"}
              height={""}
              width={""}
              onClick={onClickProfileBtn}
              animate={""}
            />
            <LayoutBtn
              text={"로그아웃"}
              fontSize={"1em"}
              height={""}
              width={""}
              onClick={onClickLogOut}
              animate={""}
            />
          </ProfileMenu>
        )}
        {showSearchBar && (
          <div>
            <SearchBox />
          </div>
        )}
      </Header>
      <Body>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={""} element={<Promises />} />
            <Route path={"profile"} element={<Profile />} />
            <Route path={"myplans/:page"} element={<MyPlans />} />
            <Route path={"compose/:id"} element={<Compose />} />
          </Routes>
        </Suspense>
      </Body>
      <Bottom>
        <LayoutBtn
          text={"메인"}
          fontSize={"1em"}
          height={"100%"}
          width={"100%"}
          onClick={() => {
            navigate("");
          }}
          animate={""}
        />
        <LayoutBtn
          text={"내 약속"}
          fontSize={"1em"}
          height={"100%"}
          width={"100%"}
          onClick={() => {
            navigate("myplans/participate");
          }}
          animate={""}
        />
        <LayoutBtn
          text={"검색"}
          fontSize={"1em"}
          height={"100%"}
          width={"100%"}
          onClick={onClickSearchBtn}
          animate={""}
        />
      </Bottom>
    </MainBox>
  );
};

export default Main;
