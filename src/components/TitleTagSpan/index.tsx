import ColorHash from "color-hash";
import styled from "@emotion/styled/macro";

const TitleSpan = styled.div`
  border-radius: 6px;
  font-size: 0.65em;
`;

const TitleTagSpan = (Props: { str: string }) => {
  return (
    <TitleSpan
      style={{
        backgroundColor: new ColorHash().hex(Props.str),
      }}
      className={"header-title"}
    >
      {Props.str}
    </TitleSpan>
  );
};

export default TitleTagSpan;
