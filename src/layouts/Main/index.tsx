import React, {lazy, useCallback, useState} from "react";
import {Body, Bottom, Header, LinkedButton, ProfileImg, ProfileMenu} from "./style";
import {NavLink, redirect, Route, Routes,} from "react-router-dom";
import gravatar from 'gravatar';

const Apple = lazy(() => import("../../pages/Apple/Apple"));
const Profile = lazy(() => import("../../pages/Profile/index"));

const emailExample = 'jji6665@cau.ac.kr';

const Main = () => {
 const [showProfileMenu, setShowProfileMenu] = useState(false);

 const onClickProfileImg = useCallback(()=> {
  setShowProfileMenu((prevState)=>{
   return prevState? false:true;
  })
 },[])
 const onClickModifyProfile = useCallback(()=>{
 },[]);
 const onClickLogOut = useCallback(() => {}, []);


  return (
    <div>
      <Header>
       <span>밥선배</span>
        <ProfileImg src={gravatar.url(emailExample, {s: '28px'})} onClick={onClickProfileImg}></ProfileImg>
        {showProfileMenu && (<ProfileMenu>
         <LinkedButton onClick={onClickModifyProfile}>프로필 수정</LinkedButton>
         <LinkedButton onClick={onClickLogOut}>로그아웃</LinkedButton>
        </ProfileMenu>)}
      </Header>
      <Body>
        <Routes>
         <Route path={'/profile'} element={<Profile />} />
         <Route path={'/'} element={<Apple />} />
        </Routes>
      </Body>
     <Bottom>
      <div>홈</div>
      <div>내 약속</div>
      <div>검색</div>
     </Bottom>
    </div>
  );
};

export default Main;
