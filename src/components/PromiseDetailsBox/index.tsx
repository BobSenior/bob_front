/** @jsxImportSource @emotion/react */
import { memo, useCallback, useContext, useRef, useState } from "react";
import {
  ContentSection,
  DetailWrapper,
  Footer,
  HeaderSection,
  InNOut,
  MapButton,
  MembersDiv,
  PlaceInfoDiv,
  Section,
  TagSection,
  TimeInfoDiv,
  TitleHeader,
  TNPSection,
} from "./style";
import { promiseInfo } from "../../types/db";
import ColorHash from "color-hash";
import PickerSvg from "../../assets/icons/location-outline.svg";
import ColoredBtn from "../../assets/buttons/ColoredBtn";
import MemberSpanBtn from "../../assets/buttons/MemberSpanBtn";
import MapModalContext from "../../hooks/MapModalContext";

interface props {
  data: promiseInfo;
}
const major = "소프트웨어학부";

const PromiseDetailsBox = ({ data }: props) => {
  const [participateIn, setParticipateIn] = useState(false);
  const { setShowMapModal, setAddress } = useContext(MapModalContext);
  const placeInfoRef = useRef(null);

  const onClickParticipationButton = useCallback(() => {
    setParticipateIn((prevState) => {
      if (prevState) {
        //TODO:참가 신청 취소 API 연결 필요
      } else {
        //TODO:참가 신청 API 연결 필요
      }
      return !prevState;
    });
  }, []);

  return (
    <DetailWrapper
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
        <PlaceInfoDiv
          whileTap={{ scale: 0.85 }}
          onClick={() => {
            setAddress(data.place ? data.place : "");
            setShowMapModal(true);
          }}
        >
          <MapButton src={PickerSvg} />
          <span ref={placeInfoRef}>{data.place}</span>
        </PlaceInfoDiv>
        <TimeInfoDiv>
          <span>{data.time}</span>
        </TimeInfoDiv>
      </Section>
      <Section>
        <h1>Members</h1>
        <MembersDiv>
          <MemberSpanBtn onClick={() => {}} major={major}>
            어피치1<span>소프트웨어학부</span>
          </MemberSpanBtn>
          <MemberSpanBtn onClick={() => {}} major={major}>
            어피치1<span>소프트웨어학부</span>
          </MemberSpanBtn>
          <MemberSpanBtn onClick={() => {}} major={major}>
            어피치1<span>소프트웨어학부</span>
          </MemberSpanBtn>
        </MembersDiv>
      </Section>
      <Section css={ContentSection}>
        <h1>Contents</h1>
        <p>{"hi hi~"}</p>
      </Section>
      <Section css={TagSection}>
        <h1>tags</h1>
      </Section>
      <Footer>
        <ColoredBtn
          width={"100%"}
          height={"35px"}
          onClick={onClickParticipationButton}
          animate={participateIn ? "In" : "Out"}
          variants={InNOut}
          isHover={false}
          isTap={true}
        >
          <span>{participateIn ? "신청취소" : "참가신청"}</span>
        </ColoredBtn>
      </Footer>
    </DetailWrapper>
  );
};

export default memo(PromiseDetailsBox);