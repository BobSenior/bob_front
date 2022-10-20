/** @jsxImportSource @emotion/react */
import { useCallback, MouseEvent, useState } from "react";
import {
  ContentSection,
  Footer,
  HeaderSection,
  MemberSection,
  Section,
  TagSection,
} from "./style";
import { Button } from "../../pages/Home/style";
import { promiseInfo } from "../../types/db";
import { RotatingSquare } from "react-loader-spinner";

interface props {
  data: promiseInfo;
}

const PromiseDetailsBox = ({ data }: props) => {
  const onClickParticipationButton = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      //대충 참가신청 과정
    },
    []
  );

  return (
    <div>
      <Section css={HeaderSection}>
        <h1>Title</h1>
        <div>
          <span>{data.title}</span>
          <span>소프트웨어</span>
        </div>
      </Section>
      <Section css={MemberSection}>
        <h1>Members</h1>
        <div>멤버1</div>
      </Section>
      <Section css={ContentSection}>
        <h1>Contents</h1>
      </Section>
      <Section css={TagSection}>
        <h1>tags</h1>
      </Section>
      <Footer>
        <Button style={{ width: "100%" }} onClick={onClickParticipationButton}>
          <RotatingSquare
            height="50"
            width="50"
            color="#ffffff"
            ariaLabel="rotating-square-loading"
            strokeWidth="8"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Button>
      </Footer>
    </div>
  );
};

export default PromiseDetailsBox;
