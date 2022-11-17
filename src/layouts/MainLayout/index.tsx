import React, { useCallback, useState, Suspense, lazy } from "react";
import { Body, Bottom, Header, ProfileImg, MainBox, HeaderSpan } from "./style";
const Profile = lazy(() => import("../../pages/Profile"));
const Plans = lazy(() => import("../../pages/Plans"));
const Compose = lazy(() => import("../../pages/Compose"));
const Main = lazy(() => import("../../pages/Main"));
const Search = lazy(() => import("../../pages/Search"));
import ChatRoom from "../../components/ChatRoom";
import { Route, Routes, useNavigate } from "react-router-dom";
import gravatar from "gravatar";
import Loading from "../../pages/Loading";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import ListMenu from "../../components/ListMenu";
import Modal from "../../components/Modal";
import GlobalContext from "../../hooks/GlobalContext";
import SearchBar from "../../components/SearchBar";

const emailExample = "123";

const MainLayout = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [address, setAddress] = useState<string>("");

  const closeAllModals = useCallback(() => {
    setShowProfileMenu(false);
    setShowSearchBar(false);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        showMapModal,
        setShowMapModal,
        address,
        setAddress,
      }}
    >
      <MainBox onClick={closeAllModals}>
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
          <ListMenu isVisible={showProfileMenu} />
        </Header>
        <Body>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route index element={<Main />} />
              <Route path={"plans/:plan"} element={<Plans />} />
              <Route path={"search/:input"} element={<Search />} />
              <Route path={"profile"} element={<Profile />} />
              <Route path={"chat_test"} element={<ChatRoom />} />
              <Route path={"compose"} element={<Compose />} />
              <Route path={"*"} element={<div>404 error</div>} />
            </Routes>
          </Suspense>
        </Body>
        <Bottom>
          <LayoutBtn
            text={"메인"}
            onClick={() => {
              navigate("");
            }}
          />
          <LayoutBtn
            text={"내 약속"}
            onClick={() => {
              navigate(`plans/participating`);
            }}
          />
          <LayoutBtn
            text={"채팅 테스트"}
            onClick={() => {
              navigate(`chat_test`);
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
        onClickForClose={() => setShowMapModal(false)}
      >
        {address}
      </Modal>
    </GlobalContext.Provider>
  );
};

export default MainLayout;
