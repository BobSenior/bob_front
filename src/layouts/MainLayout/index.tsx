import React, {
  useCallback,
  useState,
  Suspense,
  lazy,
  MouseEvent,
  useMemo,
  useEffect,
} from "react";
import {
  Body,
  Bottom,
  Header,
  MainBox,
  IconsContainer,
  AlarmMark,
} from "./style";
const Plans = lazy(() => import("../../pages/Appointments"));
const Compose = lazy(() => import("../../pages/Compose"));
const AppointmentSpace = lazy(() => import("../../pages/AppointmentSpace"));
const Main = lazy(() => import("../../pages/Main"));
import { Route, Routes, useNavigate } from "react-router-dom";
import gravatar from "gravatar";
import Loading from "../../pages/Loading";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import MenuList from "../../components/MenuList";
import SearchBar from "../../components/SearchBar";
import AlarmSvg from "../../assets/icons/notifications-outline.svg";
import AlarmList from "../../components/AlarmList";
import { ToastContainer } from "react-toastify";
import useSWR from "swr";
import { getFetcher } from "../../utils/fetchers";
import { testUserIdx } from "../../pages/Main";
import { TotalNotices } from "../../types/db";
import ChatRoomModal from "../../components/ChatRoomModal";

const emailExample = "123";

const MainLayout = () => {
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [showListModal, setShowListModal] = useState(0);
  const [alarmCount, setAlarmCount] = useState(0);
  const { data: mainAlarms } = useSWR<TotalNotices>(
    `/notice/total?userIdx=${testUserIdx}`,
    getFetcher,
    {
      refreshInterval: 5000,
    }
  );

  const ListModal = useMemo(() => {
    switch (showListModal) {
      case 1:
        return <AlarmList setShow={setShowListModal} />;
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

  useEffect(() => {
    setAlarmCount(mainAlarms?.totalCount ?? 0);
  }, [mainAlarms]);

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
              {alarmCount > 0 && <AlarmMark />}
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
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route index element={<Main />} />
              <Route path={"search/:searchInput"} element={<Main />} />
              <Route path={"plans/:plan"} element={<Plans />} />
              <Route path={"compose"} element={<Compose />} />
              <Route path={"appointment/:id"} element={<AppointmentSpace />} />
              <Route path={"*"} element={<div>404 error</div>} />
            </Routes>
          </Suspense>
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
            text={"채팅룸"}
            onClick={() => {
              setShowChatRoom(true);
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
      {showChatRoom && <ChatRoomModal setShow={setShowChatRoom} />}
      <ToastContainer />
    </>
  );
};

export default MainLayout;
