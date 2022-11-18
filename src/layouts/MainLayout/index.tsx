import React, {
  useCallback,
  useState,
  Suspense,
  lazy,
  MouseEvent,
  useMemo,
} from "react";
import {
  Body,
  Bottom,
  Header,
  MainBox,
  IconsContainer,
  AlarmMark,
} from "./style";
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
import GlobalContext from "../../hooks/GlobalContext";
import SearchBar from "../../components/SearchBar";
import AlarmSvg from "../../assets/icons/notifications-outline.svg";
import ListAlarm from "../../components/ListAlarm";
import { AnimatePresence } from "framer-motion";
import MapModal from "../../components/MapModal/MapModal";

const emailExample = "123";

const MainLayout = () => {
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showListModal, setShowListModal] = useState(0);
  const [address, setAddress] = useState<string>("");
  const [alarmCount, setAlarmCount] = useState(1);

  const closeAllModals = useCallback(() => {
    setShowListModal(0);
  }, []);

  const ListModal = useMemo(() => {
    switch (showListModal) {
      case 1:
        return <ListAlarm />;
      case 2:
        return <ListMenu />;
      default:
        return null;
    }
  }, [showListModal]);

  const onClickAlarmBtn = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowListModal((prevState) => (prevState === 1 ? 0 : 1));
  }, []);
  const onClickAvatarBtn = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowListModal((prevState) => (prevState === 2 ? 0 : 2));
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
            <span
              className={"header-span"}
              onClick={() => {
                navigate("/");
              }}
            >
              밥선배
              <i>중앙대학교</i>
            </span>
          )}
          <IconsContainer>
            <button onClick={onClickAlarmBtn}>
              {alarmCount > 0 && <AlarmMark></AlarmMark>}
              <img
                className={"alarm-image"}
                src={AlarmSvg}
                alt={"알람 아이콘"}
              />
            </button>
            <button onClick={onClickAvatarBtn}>
              <img
                className={"avatar-image"}
                src={gravatar.url(emailExample, {
                  s: "30px",
                  d: "identicon",
                })}
                alt={"아바타 아이콘"}
              />
            </button>
          </IconsContainer>
          <AnimatePresence>{ListModal}</AnimatePresence>
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
      <MapModal
        isVisible={showMapModal}
        onClickForClose={() => {
          setShowMapModal(false);
        }}
      />
    </GlobalContext.Provider>
  );
};

export default MainLayout;
