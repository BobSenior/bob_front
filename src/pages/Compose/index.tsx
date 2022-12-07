import {
  FormEvent,
  ChangeEvent,
  useCallback,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import {
  ComposeForm,
  ComposeMain,
  ComposeWrapper,
  Handle,
  SwitchDiv,
  HandleVariant,
  SwitchWrapper,
  Label,
  SwitchVariant,
  SwitchSpan,
  SpanVariant,
  MainSpan,
  TextArea,
  TypeRadioWrapper,
  RadioBox,
  RadioDetailsBox,
  LAMButton,
  LAM_Variant,
  LAMDetailsSpan,
  ResultSpan,
} from "./style";
import { Input } from "../../components/SearchBar/style";
import { HashTagContainer } from "../../components/PostBox/style";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import RangeInput from "../../components/RangeInput";
import validator from "validator";
import { postFetcher } from "../../utils/fetchers";
import { BottomButton } from "../Login/styles";
import LocationSetModal from "../../components/LocationSetModal";
import MeetingAtSetModal from "../../components/MeetingAtSetModal";
import dayjsAll from "../../utils/dayjsAll";
import { ICoordinate, MakeNewPostReqDTO } from "../../types/db";
import GlobalContext from "../../hooks/GlobalContext";

interface basicData {
  title: string;
  contexts: string;
}

interface IBNR {
  buyers: number;
  receivers: number;
}

const postTypes = [
  [
    "같이먹자",
    "같이 밥 먹을 사람을 구해요. 모두 더치페이해요.",
    "dutch",
    "buyer",
  ],
  [
    "내가산다",
    "내가 밥 사주고 싶은 사람을 구해요. 나는 사는 사람으로 참가해요.",
    "buy",
    "buyer",
  ],
  [
    "사주세요",
    "나한테 밥 사줄 사람을 구해요. 나는 먹는 사람으로 참가해요.",
    "buy",
    "receiver",
  ],
];

const getHashTag = (str: string | null): string[] | null => {
  if (!str) return null;
  const re = /#[가-힣|a-z|A-Z|0-9|\_]+/g;
  return str.match(re)?.flatMap((x) => x.slice(1)) ?? null;
};

const Compose = () => {
  const { myData } = useContext(GlobalContext);
  const [formData, setFormData] = useState<basicData>({
    title: "",
    contexts: "",
  });
  const [hashtags, setHashtags] = useState<string[] | null>(null);
  const [coords, setCoords] = useState<ICoordinate | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [meetingAt, setMeetingAt] = useState<string | null>(null);
  const [postType, setPostType] = useState<number>(0);
  const [maxMember, setMaxMember] = useState<number>(2);
  const [BNR, setBNR] = useState<IBNR | null>(null);
  const [onlyForSameMajor, setOnlyForSameMajor] = useState<boolean>(false);
  const [showLocationSetModal, setShowLocationSetModal] = useState(false);
  const [showMeetingAtSetModal, setShowMeetingAtSetModal] = useState(false);

  const isSubmittable = useMemo(() => {
    return (
      !validator.isEmpty(formData.title) &&
      !validator.isEmpty(formData.contexts)
    );
  }, [formData]);

  const onSubmitComposeForm = (e: FormEvent) => {
    e.preventDefault();
    if (!isSubmittable || !myData) return;
    console.log(meetingAt);
    const composePost: MakeNewPostReqDTO = {
      writerIdx: myData.userIdx,
      writerPosition: postTypes[postType][3],
      title: formData.title,
      location:
        location +
        "$" +
        coords?.latitude.toString() +
        "$" +
        coords?.longitude.toString(),
      meetingAt: meetingAt,
      type: postTypes[postType][2],
      receiverNum: BNR ? BNR.receivers : null,
      buyerNum: BNR ? BNR.buyers : maxMember,
      constraint: onlyForSameMajor ? myData.department : "아무나",
      content: formData.contexts,
      tags: hashtags,
    };
    postFetcher
      .post(`/post/write`, composePost)
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const onInputTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState) => {
        return { ...prevState, title: e.target.value };
      });
    },
    [formData]
  );

  const onInputContexts = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prevState) => {
        return { ...prevState, contexts: e.target.value };
      });
    },
    [formData]
  );

  const onChangeNumOfBuyers = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const targetValue = parseInt(e.target.value);
      if (targetValue < maxMember)
        setBNR({ buyers: targetValue, receivers: maxMember - targetValue });
    },
    [maxMember]
  );

  const onChangeNumOfReceivers = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const targetValue = parseInt(e.target.value);
      if (targetValue < maxMember)
        setBNR({ receivers: targetValue, buyers: maxMember - targetValue });
    },
    [maxMember]
  );

  const onClickLocation = useCallback(() => {
    if (!location) {
      setShowLocationSetModal(true);
    } else {
      setLocation(null);
    }
  }, [location]);

  const onClickMeetingAt = useCallback(() => {
    if (!meetingAt) {
      setShowMeetingAtSetModal(true);
    } else {
      setMeetingAt(null);
    }
  }, [meetingAt]);

  useEffect(() => {
    const tags = getHashTag(formData.contexts);
    const uniqTags = tags?.filter((element, index) => {
      return tags?.indexOf(element) === index;
    });
    setHashtags(uniqTags ?? null);
  }, [formData]);

  useEffect(() => {
    if (postType === 0) {
      setBNR(null);
    }
    const halfNum = Math.round(maxMember / 2);
    setBNR({ buyers: halfNum, receivers: maxMember - halfNum });
  }, [maxMember, postType]);

  return (
    <ComposeWrapper>
      <ComposeMain>
        <MainSpan
          style={{
            fontSize: "2em",
            paddingTop: "20px",
          }}
          initial={{ opacity: 0.5, x: -100 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{ duration: 0.5 }}
        >
          새 약속을 만들어요.
        </MainSpan>
        <MainSpan
          style={{ fontSize: "0.8em", paddingTop: "5px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          같이 밥 먹을래요?
        </MainSpan>
        <ComposeForm onSubmit={onSubmitComposeForm}>
          <Label>제목</Label>
          <Input
            type={"text"}
            id={"title"}
            value={formData.title}
            onChange={onInputTitle}
            style={{ width: "100%", fontSize: "16px" }}
            placeholder={"제목을 입력해주세요."}
            maxLength={16}
          />

          <Label>내용</Label>
          <TextArea
            id={"context"}
            value={formData.contexts}
            onChange={onInputContexts}
            placeholder={"내용을 입력해주세요."}
          />
          {hashtags ? (
            <HashTagContainer style={{ paddingTop: "10px" }}>
              {hashtags?.map((value) => {
                return (
                  <span
                    style={{
                      fontSize: "1.2em",
                      margin: "2px",
                      padding: "1.5px 5px",
                      backgroundColor: "lightgray",
                    }}
                    key={generateUniqueID()}
                  >
                    #{value}
                  </span>
                );
              })}
            </HashTagContainer>
          ) : (
            <span
              style={{
                fontSize: "0.8em",
                marginTop: "7px",
                color: "grey",
              }}
            >
              #로 해시태그를 추가할 수 있어요.
            </span>
          )}
          <Label>장소</Label>
          <LAMButton
            animate={location ? "on" : "off"}
            variants={LAM_Variant}
            whileTap={{ scale: 0.9 }}
            onClick={onClickLocation}
          >
            <ResultSpan>{location ? location : "정하지 못했어요."}</ResultSpan>
            <LAMDetailsSpan>나중에 변경할 수 있어요.</LAMDetailsSpan>
          </LAMButton>
          <Label>시간</Label>
          <LAMButton
            animate={meetingAt ? "on" : "off"}
            variants={LAM_Variant}
            whileTap={{ scale: 0.9 }}
            onClick={onClickMeetingAt}
          >
            <ResultSpan>
              {meetingAt
                ? dayjsAll(meetingAt).appointmentDate() +
                  " " +
                  dayjsAll(meetingAt).appointmentTime()
                : "정하지 못했어요."}
            </ResultSpan>
            <LAMDetailsSpan>나중에 변경할 수 있어요.</LAMDetailsSpan>
          </LAMButton>
          <Label>종류</Label>
          <TypeRadioWrapper>
            <RadioBox
              onClick={() => setPostType(0)}
              animate={postType === 0 ? "on" : "off"}
              variants={SwitchVariant}
            >
              <span>{postTypes[0][0]}</span>
            </RadioBox>
            <RadioBox
              onClick={() => setPostType(1)}
              animate={postType === 1 ? "on" : "off"}
              variants={SwitchVariant}
            >
              <span>{postTypes[1][0]}</span>
            </RadioBox>
            <RadioBox
              onClick={() => setPostType(2)}
              animate={postType === 2 ? "on" : "off"}
              variants={SwitchVariant}
            >
              <span>{postTypes[2][0]}</span>
            </RadioBox>
          </TypeRadioWrapper>
          <RadioDetailsBox>
            <span>{postTypes[postType][1]}</span>
          </RadioDetailsBox>
          <Label>최대 인원수</Label>
          <RangeInput
            value={maxMember}
            onChange={(e) => setMaxMember(parseInt(e.target.value))}
          />
          {postType != 0 && (
            <>
              <Label>사는 사람</Label>
              <RangeInput
                value={BNR?.buyers ?? 0}
                onChange={onChangeNumOfBuyers}
                min={1}
              />
              <Label>먹는 사람</Label>
              <RangeInput
                value={BNR?.receivers ?? 0}
                onChange={onChangeNumOfReceivers}
                min={1}
              />
            </>
          )}
          <Label>추가 설정</Label>
          <SwitchWrapper>
            <SwitchSpan
              animate={onlyForSameMajor ? "on" : "off"}
              variants={SpanVariant}
            >
              {onlyForSameMajor
                ? "같은 학과/학부생만 참가 가능해요."
                : "아무나 참가 가능해요."}
            </SwitchSpan>
            <SwitchDiv
              id={onlyForSameMajor ? "on" : "off"}
              onClick={() => setOnlyForSameMajor((prevState) => !prevState)}
              animate={onlyForSameMajor ? "on" : "off"}
              variants={SwitchVariant}
            >
              <Handle
                layout
                animate={onlyForSameMajor ? "on" : "off"}
                variants={HandleVariant}
              />
            </SwitchDiv>
          </SwitchWrapper>
          <BottomButton
            disabled={!isSubmittable}
            variants={HandleVariant}
            animate={isSubmittable ? "on" : "off"}
          >
            약속 만들기
          </BottomButton>
        </ComposeForm>
      </ComposeMain>
      {showLocationSetModal && (
        <LocationSetModal
          setShow={setShowLocationSetModal}
          setLocation={setLocation}
          setCoords={setCoords}
        />
      )}
      {showMeetingAtSetModal && (
        <MeetingAtSetModal
          setShow={setShowMeetingAtSetModal}
          setMeetingAt={setMeetingAt}
        />
      )}
    </ComposeWrapper>
  );
};
export default Compose;
