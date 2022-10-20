import React, { useCallback, useState } from "react";
import {
  Body,
  Bottom,
  Header,
  ProfileImg,
  ProfileMenu,
  MainBox,
  Button,
} from "./style";
import { Outlet, useNavigate } from "react-router-dom";
import gravatar from "gravatar";
import SearchBox from "../../components/SearchBox";

const emailExample = "lws6665@naver.com";

const Main = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();

  const onClickProfileImg = useCallback(() => {
    setShowProfileMenu((prevState) => {
      return !prevState;
    });
  }, []);
  const onClickProfileButton = useCallback(() => {
    setShowProfileMenu(false);
    navigate("profile");
  }, []);
  const onClickSearchButton = useCallback(() => {
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
            <Button onClick={onClickProfileButton}>프로필 수정</Button>
            <Button onClick={onClickLogOut}>로그아웃</Button>
          </ProfileMenu>
        )}
        {showSearchBar && (
          <div>
            <SearchBox />
          </div>
        )}
      </Header>
      <Body>
        <Outlet />
      </Body>
      <Bottom>
        <Button
          onClick={() => {
            navigate("");
          }}
        >
          <span>메인</span>
        </Button>
        <Button
          onClick={() => {
            navigate("plans");
          }}
        >
          <span>내 약속</span>
        </Button>
        <Button onClick={onClickSearchButton}>검색</Button>
      </Bottom>
    </MainBox>
  );
};

export default Main;
