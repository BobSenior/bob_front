/** @jsxImportSource @emotion/react */
import HashColoredSpanBtn from "../../assets/buttons/HashColoredSpanBtn";
import { css } from "@emotion/react";

interface props {
  name: string;
  major: string;
  ID: number;
}

const spanCSS = css`
  font-size: xx-small;
  color: rgb(50, 50, 50);
`;

const MemberBtn = ({ name, major, ID }: props) => {
  return (
    <HashColoredSpanBtn
      major={major}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {name}
      <span css={spanCSS}>
        {" "}
        in {major}
        {ID}
      </span>
    </HashColoredSpanBtn>
  );
};
export default MemberBtn;
