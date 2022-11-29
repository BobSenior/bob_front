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
const Plans = lazy(() => import("../../pages/Appointments"));
const Compose = lazy(() => import("../../pages/Compose"));
const AppointmentSpace = lazy(()=>import ("../../pages/AppointmentSpace"));
const Main = lazy(() => import("../../pages/Main"));
import ChatRoom from "../../components/ChatRoom";
import { Route, Routes, useNavigate } from "react-router-dom";
import gravatar from "gravatar";
import Loading from "../../pages/Loading";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import MenuList from "../../components/MenuList";
import SearchBar from "../../components/SearchBar";
import AlarmSvg from "../../assets/icons/notifications-outline.svg";
import AlarmList from "../../components/AlarmList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR, { SWRConfig } from "swr";
import { getFetcher } from "../../utils/fetchers";
import { testUserIdx } from "../../pages/Main";
import ChatRoomModal from "../../components/ChatRoomModal";
import Search from "../../pages/Search";

const emailExample = "123";

const MainLayout = () => {
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showListModal, setShowListModal] = useState(0);
  const [alarmCount, setAlarmCount] = useState(1);
  const [showChatRoomModal, setShowChatRoomModal] = useState(false);
  const {
    data: alarmData,
    error,
    isValidating,
    mutate: alarmMuate,
  } = useSWR(``, getFetcher);

  const ListModal = useMemo(() => {
    switch (showListModal) {
      case 1:
        return <AlarmList />;
      case 2:
        return <MenuList setShow={setShowListModal} />;
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
    <>
      <MainBox>
        <Header>
          {showSearchBar ? (
            <SearchBar />
          ) : (
            <span className={"header-span"} onClick={() => navigate("/")}>
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
                alt={"avatar icon"}
              />
            </button>
          </IconsContainer>
          {ListModal && (
            <>
              <div
                style={{
                  position: "fixed",
                  top: "38px",
                  left: 0,
                  width: "100vw",
                  height: "calc(100vh - 38px)",
                }}
                onClick={() => setShowListModal(0)}
              ></div>
              {ListModal}
            </>
          )}
        </Header>
        <Body>
          <SWRConfig>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route index element={<Main />} />
                <Route path={"plans/:plan"} element={<Plans />} />
                <Route path={"search/:searchInput"} element={<Search />} />
                <Route path={"profile"} element={<Profile />}>
                  <Route path={":userIdx"} />
                  <Route path={"me"} />
                </Route>
                <Route path={"chat_test"} element={<ChatRoom />} />
                <Route path={"compose"} element={<Compose />} />
                <Route path={"*"} element={<div>404 error</div>} />
                <Route path={"appointment/:id"} element={<AppointmentSpace />} />
              </Routes>
            </Suspense>
          </SWRConfig>
        </Body>
        <Bottom>
          <LayoutBtn
            text={"메인"}
            onClick={() => {
              setShowSearchBar(false);
              navigate("");
            }}
          />
          <LayoutBtn
            text={"내 약속"}
            onClick={() => {
              setShowSearchBar(false);
              navigate(`plans/participating`);
            }}
          />
          <LayoutBtn
            text={"채팅 테스트"}
            onClick={() => {
              setShowSearchBar(false);
              setShowChatRoomModal(true);
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
      <ToastContainer />
      {showChatRoomModal && <ChatRoomModal setShow={setShowChatRoomModal} />}
    </>
  );
};

export default MainLayout;
