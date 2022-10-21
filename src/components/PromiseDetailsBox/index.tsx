/** @jsxImportSource @emotion/react */
import { useCallback, MouseEvent, useState } from "react";
import {
  ContentSection,
  Footer,
  HeaderSection,
  MemberSection,
  PlaceInfoDiv,
  PushedButton,
  Section,
  TagSection,
  TimeInfoDiv,
  TitleHeader,
  TNPSection,
} from "./style";
import { Button } from "../../pages/Home/style";
import { promiseInfo } from "../../types/db";
import ColorHash from "color-hash";
import { css } from "@emotion/react";

interface props {
  data: promiseInfo;
}
const major = "소프트웨어학부";

const PromiseDetailsBox = ({ data }: props) => {
  const [participateIn, setParticipateIn] = useState(false);
  const onClickParticipationButton = useCallback(() => {
    if (participateIn) return;
    //대충 참가신청 과정

    setParticipateIn(true);
  }, []);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Section css={HeaderSection}>
        <h1>Info</h1>
        <div>
          <span
            style={{
              backgroundColor: new ColorHash().hex(major),
            }}
            css={TitleHeader}
          >
            {major}
          </span>
          <span>{data.title}</span>
        </div>
      </Section>
      <Section css={TNPSection}>
        <PlaceInfoDiv>
          <button>(대충 피커 모양)</button>
          {data.place}
        </PlaceInfoDiv>
        <TimeInfoDiv>
          <span>{data.time}</span>
        </TimeInfoDiv>
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
        <Button
          style={{ width: "100%" }}
          css={participateIn ? PushedButton : null}
          onClick={onClickParticipationButton}
        >
          {!participateIn ? "참가신청" : "참가신청완료"}
        </Button>
      </Footer>
    </div>
  );
};

export default PromiseDetailsBox;
