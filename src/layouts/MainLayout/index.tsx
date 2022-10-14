import React, { useCallback, useState } from "react";
import {
  Body,
  Bottom,
  Header,
  LinkedButton,
  ProfileImg,
  ProfileMenu,
} from "./style";
import { Link, Outlet, useNavigate } from "react-router-dom";
import gravatar from "gravatar";

const emailExample = "lws6665@naver.com";

const Main = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const onClickProfileImg = useCallback(() => {
    setShowProfileMenu((prevState) => {
      return !prevState;
    });
  }, []);

  const onClickLogOut = useCallback(() => {
    setShowProfileMenu(false);
  }, []);

  return (
    <div>
      <Header>
        <span
          onClick={() => {
            navigate("/main");
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
            <Link to={"profile"} style={{ textDecoration: "none" }}>
              <LinkedButton
                onClick={() => {
                  setShowProfileMenu(false);
                }}
              >
                프로필 수정
              </LinkedButton>
            </Link>
            <LinkedButton onClick={onClickLogOut}>로그아웃</LinkedButton>
          </ProfileMenu>
        )}
      </Header>
      <Body>
        <Outlet />
      </Body>
      <Bottom>
        <div
          onClick={() => {
            navigate("main");
          }}
        >
          메인
        </div>
        <div
          onClick={() => {
            navigate("mypromises");
          }}
        >
          내 약속
        </div>
        <div>검색</div>
        <div
          onClick={() => {
            navigate("apple");
          }}
        >
          예시
        </div>
      </Bottom>
    </div>
  );
};

export default Main;
