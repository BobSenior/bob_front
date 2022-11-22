/** @jsxImportSource @emotion/react */
import HashColoredSpanBtn from "../../assets/buttons/HashColoredSpanBtn";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { css } from "@emotion/react";
import React, { useRef, useState } from "react";
import {
  MajorSpan,
  MemberInfoDiv,
  MemberInfoPopUp,
  ProfileImg,
  ProfileScriptBox,
} from "./style";
import { AnimatePresence } from "framer-motion";
import gravatar from "gravatar";
import ColoredBtn from "../../assets/buttons/ColoredBtn";
import EnterSvg from "../../assets/icons/enter-outline.svg";
import CopySvg from "../../assets/icons/copy-outline.svg";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const MemberBtn = (userData: {
  userIdx: number;
  nickName: string;
  department: string;
  schoolId: number;
}) => {
  const [showMemberInfoPopUp, setShowMemberInfoPopUp] =
    useState<boolean>(false);
  const nameSpanRef = useRef<HTMLSpanElement>(null);

  const closeEvent = () => {
    setShowMemberInfoPopUp(false);
  };

  return (
    <div>
      <HashColoredSpanBtn
        coloringText={userData.department}
        onClick={(e) => {
          e.stopPropagation();
          setShowMemberInfoPopUp(true);
        }}
      >
        <span ref={nameSpanRef}>{userData.nickName}</span>
        <MajorSpan>
          {" "}
          in {userData.department}
          {userData.schoolId}
        </MajorSpan>
      </HashColoredSpanBtn>
      <AnimatePresence
        onExitComplete={() => {
          window.removeEventListener("scroll", closeEvent);
        }}
      >
        {showMemberInfoPopUp && (
          <>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowMemberInfoPopUp(false);
              }}
            ></div>
            <MemberInfoPopUp
              css={css`
                left: ${nameSpanRef.current?.offsetLeft}px;
                top: ${nameSpanRef.current?.offsetTop}px;
              `}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 20 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onAnimationComplete={() => {
                window.addEventListener("scroll", closeEvent);
              }}
            >
              <svg width={"50"} height={"20"}>
                <polygon
                  points="35,0 35,20 70,50"
                  fill="var(--basic-back-color)"
                />
                Sorry, your browser does not support inline SVG.
              </svg>
              <MemberInfoDiv
                initial={{ boxShadow: "0px 0px 0 rgba(50,50,50,0.2)" }}
                animate={{ boxShadow: "5px 3px 0 rgba(50,50,50,0.2)" }}
                exit={{ boxShadow: "0px 0px 0 rgba(50,50,50,0.2)" }}
                transition={{ duration: 1 }}
              >
                <ProfileImg
                  src={gravatar.url(userData.nickName, {
                    s: "50px",
                    d: "identicon",
                  })}
                />
                <ProfileScriptBox>
                  <CopyToClipboard
                    text={userData.nickName + "@" + userData.schoolId}
                    onCopy={() => {
                      toast.success("복사완료!", {
                        position: "bottom-left",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                        style: { width: "150px" },
                      });
                    }}
                  >
                    <span style={{ cursor: "pointer", width: "fit-content" }}>
                      <strong>{userData.nickName}</strong>
                      <i style={{ color: "dimgray", fontSize: "0.8em" }}>
                        @{userData.schoolId}
                      </i>
                      <img
                        src={CopySvg}
                        width={"12px"}
                        height={"12px"}
                        style={{ margin: "0 5px" }}
                        alt={"copy-icon"}
                      />
                    </span>
                  </CopyToClipboard>
                  <span style={{ fontSize: "0.7em" }}>
                    {userData.department}
                    <i>{userData.schoolId}</i>
                  </span>
                </ProfileScriptBox>{" "}
                <NavLink
                  to={`/main/profile/${userData.userIdx}`}
                  style={{
                    textDecoration: "initial",
                    width: "45px",
                    height: "50px",
                  }}
                  end={true}
                >
                  <ColoredBtn width={"100%"} height={"100%"}>
                    <img
                      src={EnterSvg}
                      width={"25px"}
                      height={"25px"}
                      alt={"enter-icon"}
                    />
                    <span style={{ fontSize: "0.15em", color: "black" }}>
                      더보기
                    </span>
                  </ColoredBtn>
                </NavLink>
              </MemberInfoDiv>
            </MemberInfoPopUp>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default MemberBtn;
