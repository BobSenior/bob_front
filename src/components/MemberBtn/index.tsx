/** @jsxImportSource @emotion/react */
import HashColoredSpanBtn from "../../assets/buttons/HashColoredSpanBtn";
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

interface props {
  name: string;
  major: string;
  ID: number;
}

const MemberBtn = ({ name, major, ID }: props) => {
  const [showMemberInfoPopUp, setShowMemberInfoPopUp] =
    useState<boolean>(false);
  const nameSpanRef = useRef<HTMLSpanElement>(null);

  const closeEvent = () => {
    setShowMemberInfoPopUp(false);
  };

  return (
    <div>
      <HashColoredSpanBtn
        coloringText={major}
        onClick={(e) => {
          e.stopPropagation();
          setShowMemberInfoPopUp((prevState) => !prevState);
        }}
      >
        <span ref={nameSpanRef}>{name}</span>
        <MajorSpan>
          {" "}
          in {major}
          {ID}
        </MajorSpan>
      </HashColoredSpanBtn>
      <AnimatePresence
        onExitComplete={() => {
          window.removeEventListener("click", closeEvent);
          window.removeEventListener("scroll", closeEvent);
        }}
      >
        {showMemberInfoPopUp && (
          <MemberInfoPopUp
            css={css`
              left: ${nameSpanRef.current?.offsetLeft}px;
              top: ${nameSpanRef.current?.offsetTop}px;
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onAnimationComplete={() => {
              window.addEventListener("click", closeEvent);
              window.addEventListener("scroll", closeEvent);
            }}
          >
            <svg width={"50"} height={"20"}>
              <polygon
                points="35,0 35,20 70,40"
                fill="var(--basic-back-color)"
              />
              Sorry, your browser does not support inline SVG.
            </svg>
            <MemberInfoDiv>
              <ProfileImg
                src={gravatar.url(name, { s: "50px", d: "identicon" })}
              />
              <ProfileScriptBox>
                <span>{name}</span>
                <div>
                  {major}
                  {ID}
                </div>
              </ProfileScriptBox>
            </MemberInfoDiv>
          </MemberInfoPopUp>
        )}
      </AnimatePresence>
    </div>
  );
};
export default MemberBtn;
