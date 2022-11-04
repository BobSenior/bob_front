/** @jsxImportSource @emotion/react */
import { useCallback, useContext, useState, MouseEvent } from "react";
import {
  ContentSection,
  DetailWrapper,
  Footer,
  HeaderSection,
  InNOut,
  PickerImg,
  MembersDiv,
  PlaceInfoDiv,
  Section,
  TimeInfoDiv,
  TitleHeader,
  TNPSection,
} from "./style";
import { promiseInfo } from "../../types/db";
import ColorHash from "color-hash";
import PickerSvg from "../../assets/icons/location-outline.svg";
import ColoredBtn from "../../assets/buttons/ColoredBtn";
import GlobalContext from "../../hooks/GlobalContext";
import MemberBtn from "../MemberBtn";

interface props {
  data: promiseInfo;
}
const major = "소프트웨어학부";

const PromiseDetailsBox = ({ data }: props) => {
  const [participateIn, setParticipateIn] = useState(false);
  const { setShowMapModal, setAddress } = useContext(GlobalContext);

  const onClickParticipationButton = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setParticipateIn((prevState) => {
        if (prevState) {
          //TODO:참가 신청 취소 API 연결 필요
        } else {
          //TODO:참가 신청 API 연결 필요
        }
        return !prevState;
      });
    },
    []
  );

  const onClickPlaceInfoDiv = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAddress(data.place ? data.place : "");
    setShowMapModal(true);
  }, []);

  return (
    <DetailWrapper onClick={(e) => e.stopPropagation()}>
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
        <PlaceInfoDiv whileTap={{ scale: 0.85 }} onClick={onClickPlaceInfoDiv}>
          <PickerImg src={PickerSvg} />
          <span>{data.place}</span>
        </PlaceInfoDiv>
        <TimeInfoDiv>
          <span>{data.time}</span>
        </TimeInfoDiv>
      </Section>
      <Section>
        <h1>Members</h1>
        <MembersDiv>
          <MemberBtn name={data.name} major={data.major} ID={data.ID} />
        </MembersDiv>
      </Section>
      <Section css={ContentSection}>
        <h1>Contents</h1>
        <p>{"hi hi~"}</p>
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

export default PromiseDetailsBox;
