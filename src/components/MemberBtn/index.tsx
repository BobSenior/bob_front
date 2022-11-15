/** @jsxImportSource @emotion/react */
import HashColoredSpanBtn from "../../assets/buttons/HashColoredSpanBtn";
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import {
  MajorSpan,
  MemberInfoDiv,
  ProfileImg,
  ProfileScriptBox,
} from "./style";
import { AnimatePresence } from "framer-motion";

interface props {
  name: string;
  major: string;
  ID: number;
}

const MemberBtn = ({ name, major, ID }: props) => {
  const [showMemberInfoDiv, setShowMemberInfoDiv] = useState<boolean>(false);
  const nameSpanRef = useRef<HTMLSpanElement>(null);

  const closeEvent = () => {
    setShowMemberInfoDiv(false);
  };
  useEffect(() => {
    window.addEventListener("click", closeEvent);
    window.addEventListener("scroll", closeEvent);
    return () => {
      window.removeEventListener("click", closeEvent);
      window.removeEventListener("scroll", closeEvent);
    };
  }, []);

  return (
    <div>
      <HashColoredSpanBtn
        coloringText={major}
        onClick={(e) => {
          e.stopPropagation();
          setShowMemberInfoDiv((prevState) => !prevState);
        }}
      >
        <span ref={nameSpanRef}>{name}</span>
        <MajorSpan>
          {" "}
          in {major}
          {ID}
        </MajorSpan>
      </HashColoredSpanBtn>
      <AnimatePresence>
        {showMemberInfoDiv && (
          <MemberInfoDiv
            css={css`
              left: ${nameSpanRef.current?.offsetLeft}px;
              top: ${nameSpanRef.current?.offsetTop}px;
            `}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 30 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ProfileImg />
            <ProfileScriptBox>
              <span>{name}</span>
              <div>
                {major}
                {ID}
              </div>
            </ProfileScriptBox>
          </MemberInfoDiv>
        )}
      </AnimatePresence>
    </div>
  );
};
export default MemberBtn;
