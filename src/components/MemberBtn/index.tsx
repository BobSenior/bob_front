/** @jsxImportSource @emotion/react */
import HashColoredSpanBtn from "../../assets/buttons/HashColoredSpanBtn";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import {
  MajorSpan,
  MemberInfoDiv,
  MemberInfoPopUp,
  MemberRemoveBtn,
  ProfileImg,
  ProfileScriptBox,
} from "./style";
import { AnimatePresence } from "framer-motion";
import gravatar from "gravatar";
import PersonRemoveSvg from "../../assets/icons/person-remove-outline.svg";
import CopySvg from "../../assets/icons/copy-outline.svg";
import { toast } from "react-toastify";

const MemberBtn = (userData: {
  userIdx: number;
  nickName: string;
  department: string;
  schoolId: number;
  isLeader?: boolean;
  onClick?: () => void;
}) => {
  const [showMemberInfoPopUp, setShowMemberInfoPopUp] =
    useState<boolean>(false);
  const nameSpanRef = useRef<HTMLSpanElement>(null);
  const [leftMovePopUp, setLeftMovePopUp] = useState<number>(0);

  const closeEvent = () => {
    setShowMemberInfoPopUp(false);
  };

  useEffect(() => {
    if (nameSpanRef.current) {
      if (nameSpanRef.current.offsetLeft + 255 > window.innerWidth) {
        const num = nameSpanRef.current.offsetLeft + 255 - window.innerWidth;
        setLeftMovePopUp(num);
      }
    }
    return () => {};
  }, [showMemberInfoPopUp]);

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
                left: ${(nameSpanRef.current?.offsetLeft
                  ? nameSpanRef.current?.offsetLeft
                  : 0) - leftMovePopUp}px;
                top: ${nameSpanRef.current?.offsetTop}px;
              `}
              initial={{ opacity: 0, y: 0 }}
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
              <svg width={"190"} height={"20"}>
                <polygon
                  points={`${50 + leftMovePopUp},0 ${30 + leftMovePopUp},30 ${
                    70 + leftMovePopUp
                  },30`}
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
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {userData.nickName}
                  </span>
                  <CopyToClipboard
                    text={userData.nickName + "@" + userData.userIdx}
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
                    <span
                      style={{
                        color: "dimgray",
                        fontSize: "0.8em",
                        cursor: "pointer",
                        width: "fit-content",
                      }}
                    >
                      @{userData.userIdx}
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
                </ProfileScriptBox>
                {userData.isLeader && (
                  <MemberRemoveBtn onClick={userData?.onClick ?? undefined}>
                    <img
                      src={PersonRemoveSvg}
                      width={"20px"}
                      height={"20px"}
                      alt={"removeSvg"}
                    />
                  </MemberRemoveBtn>
                )}
              </MemberInfoDiv>
            </MemberInfoPopUp>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default MemberBtn;
