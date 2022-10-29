import React, { useCallback, useState, Suspense, lazy, useEffect } from "react";
import {
  Body,
  Bottom,
  Header,
  ProfileImg,
  MainBox,
  ProfileMenu,
  HeaderSpan,
} from "./style";
const Profile = lazy(() => import("../../pages/Profile"));
const Plans = lazy(() => import("../../pages/Plans"));
const Compose = lazy(() => import("../../pages/Compose"));
const Main = lazy(() => import("../../pages/Main"));
const Search = lazy(() => import("../../pages/Search"));
import { Route, Routes, useNavigate } from "react-router-dom";
import gravatar from "gravatar";
import Loading from "../../pages/Loading";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import ListMenu from "../../components/ListMenu";
import Modal from "../../components/Modal";
import MapModalContext from "../../hooks/MapModalContext";
import SearchBar from "../../components/SearchBar";

const emailExample = "123";

const MainLayout = () => {
  const navigate = useNavigate();
  const [numOfColumns, setNumOfColumns] = useState<number>(1);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [address, setAddress] = useState<string>("");

  const closeAllModals = useCallback(() => {
    setShowProfileMenu(false);
    setShowSearchBar(false);
    setShowMapModal(false);
  }, [showProfileMenu, showSearchBar, showMapModal]);

  const recountColumns = () => {
    setNumOfColumns(Math.floor(window.innerWidth / 400));
  };

  useEffect(() => {
    window.addEventListener("resize", recountColumns);
    recountColumns();
    return () => {
      window.removeEventListener("resize", recountColumns);
    };
  }, [window]);

  return (
    <MapModalContext.Provider
      value={{ showMapModal, setShowMapModal, address, setAddress }}
    >
      <MainBox>
        <Header>
          {showSearchBar ? (
            <SearchBar />
          ) : (
            <HeaderSpan
              onClick={() => {
                navigate("/");
              }}
            >
              밥선배
            </HeaderSpan>
          )}
          <ProfileImg
            src={gravatar.url(emailExample, { s: "28px", d: "identicon" })}
            onClick={(e) => {
              e.stopPropagation();
              setShowProfileMenu((prevState) => !prevState);
            }}
          />
          <ListMenu isVisible={showProfileMenu} styleCSS={ProfileMenu}>
            <LayoutBtn
              text={"새 약속 만들기"}
              fontSize={"1em"}
              onClick={(e) => {
                e.stopPropagation();
                closeAllModals();
                navigate("compose");
              }}
            />
            <LayoutBtn
              text={"프로필 수정"}
              fontSize={"1em"}
              onClick={(e) => {
                e.stopPropagation();
                closeAllModals();
                navigate("profile");
              }}
            />
            <LayoutBtn
              text={"로그아웃"}
              fontSize={"1em"}
              onClick={(e) => {
                e.stopPropagation();
                closeAllModals();
              }}
            />
          </ListMenu>
        </Header>
        <Body>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                index
                element={
                  <Main numOfColumns={numOfColumns > 3 ? 3 : numOfColumns} />
                }
              />
              <Route path={"search/:input"} element={<Search />} />
              <Route
                path={"plans/:plan"}
                element={
                  <Plans numOfColumns={numOfColumns > 2 ? 2 : numOfColumns} />
                }
              />
              <Route path={"profile"} element={<Profile />} />
              <Route path={"compose"} element={<Compose />} />
              <Route path={"*"} element={<div>404 error</div>} />
            </Routes>
          </Suspense>
        </Body>
        <Bottom>
          <LayoutBtn
            text={"메인"}
            onClick={() => {
              closeAllModals();
              navigate("");
            }}
          />
          <LayoutBtn
            text={"내 약속"}
            onClick={() => {
              closeAllModals();
              navigate(`plans/participating`);
            }}
          />
          <LayoutBtn
            text={"검색"}
            onClick={(e) => {
              e.stopPropagation();
              setShowSearchBar((prevState) => {
                return !prevState;
              });
            }}
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

export default MainLayout;
