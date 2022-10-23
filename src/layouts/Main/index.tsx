import React, {
  MouseEvent,
  useCallback,
  useState,
  Suspense,
  lazy,
} from "react";
import {
  Body,
  Bottom,
  Header,
  ProfileImg,
  MainBox,
  ProfileMenu,
} from "./style";
const Promises = lazy(() => import("../../pages/Promises"));
const Profile = lazy(() => import("../../pages/Profile"));
const Plans = lazy(() => import("../Plans"));
const Compose = lazy(() => import("../../pages/Compose"));
import { Route, Routes, useNavigate } from "react-router-dom";
import gravatar from "gravatar";
import SearchBox from "../../components/SearchBox";
import Loading from "../../pages/Loading";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import ListMenu from "../../components/ListMenu";
import Modal from "../../components/Modal";
import MapModalContext from "../../hooks/MapModalContext";

const emailExample = "123@naver.com";

const Main = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [address, setAddress] = useState<string>("");

  const closeAllModal = useCallback(() => {
    setShowProfileMenu(false);
    setShowSearchBar(false);
    setShowMapModal(false);
  }, [showProfileMenu, showSearchBar, showMapModal]);

  const onClickProfileImg = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowProfileMenu((prevState) => {
      return !prevState;
    });
  }, []);
  const onClickComposeBtn = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowProfileMenu(false);
    navigate("compose");
  }, []);
  const onClickProfileBtn = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowProfileMenu(false);
    navigate("profile");
  }, []);
  const onClickSearchBtn = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowSearchBar((prevState) => {
      return !prevState;
    });
  }, []);
  const onClickLogOut = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowProfileMenu(false);
  }, []);

  return (
    <MapModalContext.Provider
      value={{ showMapModal, setShowMapModal, address, setAddress }}
    >
      <MainBox onClick={closeAllModal}>
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
          {showSearchBar && (
            <div>
              <SearchBox />
            </div>
          )}
          <ListMenu isVisible={showProfileMenu} styleCSS={ProfileMenu}>
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
          </ListMenu>
        </Header>
        <Body>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path={""} element={<Promises />} />
              <Route path={"profile"} element={<Profile />} />
              <Route path={"plans/:id/:plan"} element={<Plans />} />
              <Route path={"compose/:id"} element={<Compose />} />
              <Route path={"*"} element={<div>404 error</div>} />
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
              navigate(`plans/${emailExample}/participating`);
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
      <Modal
        isVisible={showMapModal}
        onClickForClose={() => {
          setShowMapModal(false);
        }}
      >
        {address}
      </Modal>
    </MapModalContext.Provider>
  );
};

export default Main;
