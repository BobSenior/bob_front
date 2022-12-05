import React, { memo } from "react";
import gravatar from "gravatar";
import { Column, Container } from "./style";
import { DeportmentSpan, IdxSpan, NickNameSpan } from "../MemberBtn/style";
import { toast } from "react-toastify";
import CopySvg from "../../assets/icons/copy-outline.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";

const MyProfileMenu = () => {
  return (
    <Container>
      <img
        src={gravatar.url("userData.nickName", {
          s: "55px",
          d: "identicon",
        })}
        alt={"my-profile-img"}
      />
      <Column>
        <NickNameSpan>유저 닉네임</NickNameSpan>
        <CopyToClipboard
          text={"유저 닉네임" + "@" + "유저Idx"}
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
          <IdxSpan>
            @{"userIdx"}
            <img
              src={CopySvg}
              width={"12px"}
              height={"12px"}
              style={{ margin: "0 5px" }}
              alt={"copy-icon"}
            />
          </IdxSpan>
        </CopyToClipboard>
        <DeportmentSpan>학교명 학과명</DeportmentSpan>
      </Column>
    </Container>
  );
};

export default memo(MyProfileMenu);
