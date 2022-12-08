import React, { memo, useContext } from "react";
import gravatar from "gravatar";
import { Column, Container } from "./style";
import { DeportmentSpan, IdxSpan, NickNameSpan } from "../MemberBtn/style";
import { toast } from "react-toastify";
import CopySvg from "../../assets/icons/copy-outline.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import GlobalContext from "../../hooks/GlobalContext";

const MyProfileMenu = () => {
  const { myData } = useContext(GlobalContext);

  return (
    <Container>
      <img
        src={gravatar.url(myData?.nickname ?? "", {
          s: "55px",
          d: "identicon",
        })}
        alt={"my-profile-img"}
      />
      <Column>
        <NickNameSpan>{myData?.nickname}</NickNameSpan>
        <CopyToClipboard
          text={myData?.nickname + "@" + myData?.userIdx}
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
            @{myData?.userIdx}
            <img
              src={CopySvg}
              width={"12px"}
              height={"12px"}
              style={{ margin: "0 5px" }}
              alt={"copy-icon"}
            />
          </IdxSpan>
        </CopyToClipboard>
        <DeportmentSpan>
          {myData?.school} {myData?.department}
        </DeportmentSpan>
      </Column>
    </Container>
  );
};

export default memo(MyProfileMenu);
