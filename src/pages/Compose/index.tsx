import { FormEvent, ChangeEvent, useCallback, useState, useMemo } from "react";
import {
  ComposeForm,
  ComposeMain,
  ComposeWrapper,
  Handle,
  SwitchDiv,
  HandleVariant,
  SwitchWrapper,
  SubmitButton,
  Label,
  SwitchVariant,
  SwitchSpan,
  SpanVariant,
  MainSpan,
  TextArea,
} from "./style";
import { Input } from "../../components/SearchBar/style";
import { HashTagContainer } from "../../components/PostBox/style";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import RangeInput from "../../components/RangeInput";
import validator from "validator";
import { postFetcher } from "../../utils/fetchers";

interface basicData {
  title: string;
  contexts: string;
  tags: string[] | null;
}

const getHashTag = (str: string | null): string[] | null => {
  if (!str) return null;
  const re = /#[가-힣|a-z|A-Z|0-9|\_]+/g;
  return str.match(re)?.flatMap((x) => x.slice(1)) ?? null;
};

const Compose = () => {
  const [formData, setFormData] = useState<basicData>({
    title: "",
    contexts: "",
    tags: null,
  });
  const [maxMember, setMaxMember] = useState<number>(2);
  const [position,setPosition] = useState<string>("buyer");
  const [dutch, setDutch] = useState<boolean>(false);
  const [onlyForSameMajor, setOnlyForSameMajor] = useState<boolean>(false);
  const [onlyForAnonymous, setOnlyForAnonymous] = useState<boolean>(false);

  const isSubmittable = useMemo(() => {
    return (
      !validator.isEmpty(formData.title) &&
      !validator.isEmpty(formData.contexts)
    );
  }, [formData]);

  const onSubmitComposeForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      //TODO: form제출
      postFetcher
        .post("/post/write", {
          //TODO : user정보 세팅하기
          writerIdx:1,
          writerPosition:dutch?"buyer":position,
          location:"칰폴레옹",
          meetingAt:null,
          type:dutch?"dutch":"buy",
          receiverNum:maxMember,
          buyerNum:maxMember,
          buyer:[1],
          title: formData.title,
          content: formData.contexts,
          tags: formData.tags,
          constraint:onlyForSameMajor?"ANY":"컴퓨터공학",
        })
        .then((res) => {
          console.log("제출" + res);
        })
        .catch((reason) => {
          console.log(reason);
        });
      console.log({ formData, maxMember, onlyForSameMajor, onlyForAnonymous });
    },
    [formData, maxMember, onlyForSameMajor, onlyForAnonymous,dutch,position]
  );

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

  const onPointerOutContext = useCallback(() => {
    const tags = getHashTag(formData.contexts);
    setFormData((prevState) => {
      return { ...prevState, tags: tags ? tags : null };
    });
  }, [formData]);

  const onSelectDutch = useCallback((e: ChangeEvent)=>{
    setDutch((dutch:boolean)=>true);
    setPosition("buyer");
  },[dutch,position]);

  const onSelectBuy = useCallback((e: ChangeEvent)=>{
    setDutch((dutch:boolean)=>false);
    setPosition("buyer");
  },[dutch,position]);

  const onSelectReceive = useCallback((e: ChangeEvent)=>{
    setDutch((dutch)=>false);
    setPosition("receiver");
  },[dutch,position]);

  console.log(dutch);

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
            value={formData.contexts ?? undefined}
            onChange={onInputContexts}
            onPointerOut={onPointerOutContext}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") onPointerOutContext();
            }}
            placeholder={"내용을 입력해주세요."}
          />
          {formData.tags ? (
            <HashTagContainer style={{ paddingTop: "10px" }}>
              {formData.tags?.map((value) => {
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

          <Label>종류</Label>
          <fieldset>
            <div>
              <input type={"radio"} name={"category"} onChange={onSelectDutch}/>
              <label htmlFor={"category1"}>같이먹자</label>
            </div>
            <div>s
              <input type={"radio"} name={"category"} onChange={onSelectBuy}/>
              <label htmlFor={"category2"}>내가산다</label>
            </div>
            <div>
              <input type={"radio"} name={"category"} onChange={onSelectReceive}/>
              <label htmlFor={"category3"}>사주세요</label>
            </div>
          </fieldset>
          <Label>최대 인원수</Label>
          <RangeInput value={maxMember} setValue={setMaxMember} />
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
          <SwitchWrapper>
            <SwitchSpan
              animate={onlyForAnonymous ? "on" : "off"}
              variants={SpanVariant}
            >
              {onlyForAnonymous ? "익명으로 참가해요." : "실명으로 참가해요."}
            </SwitchSpan>
            <SwitchDiv
              id={onlyForAnonymous ? "on" : "off"}
              onClick={() => setOnlyForAnonymous((prevState) => !prevState)}
              animate={onlyForAnonymous ? "on" : "off"}
              variants={SwitchVariant}
            >
              <Handle
                layout
                animate={onlyForAnonymous ? "on" : "off"}
                variants={HandleVariant}
              />
            </SwitchDiv>
          </SwitchWrapper>
          <SubmitButton
            type={"submit"}
            disabled={!isSubmittable}
            animate={isSubmittable ? "on" : "off"}
            variants={HandleVariant}
          >
            약속 만들기
          </SubmitButton>
        </ComposeForm>
      </ComposeMain>
    </ComposeWrapper>
  );
};
export default Compose;
