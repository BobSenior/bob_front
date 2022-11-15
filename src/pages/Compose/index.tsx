import { FormEvent, ChangeEvent, useCallback, useState } from "react";
import {
  ComposeForm,
  ComposeMain,
  ComposeWrapper,
  Handle,
  SwitchDiv,
  spring,
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
import { HashTagContainer } from "../../components/PromiseBox/style";
import HashTag from "../../components/HashTag";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import RangeInput from "../../components/RangeInput";

interface composeData {
  title: string;
  contexts: string | null;
  tags: string[] | null;
}

const getHashTag = (str: string | null): string[] | null => {
  if (!str) return null;

  const re = /#[가-힣|a-z|A-Z|0-9|\_]+/g;
  return str.match(re)?.flatMap((x) => x.slice(1)) ?? null;
};

const Compose = () => {
  const [formData, setFormData] = useState<composeData>({
    title: "",
    contexts: null,
    tags: null,
  });
  const [maxMember, setMaxMember] = useState<number>(2);
  const [onlyForSameMajor, setOnlyForSameMajor] = useState<boolean>(false);
  const [onlyForAnonymous, setOnlyForAnonymous] = useState<boolean>(false);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

  const onSubmitComposeForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      console.log("제출");
      console.log({ formData, maxMember, onlyForSameMajor, onlyForAnonymous });
    },
    [formData, maxMember, onlyForSameMajor, onlyForAnonymous]
  );

  const checkSubmitCondition = useCallback(() => {
    if (formData.title === "" || !formData.contexts) setDisableSubmit(true);
    else setDisableSubmit(false);
  }, [formData]);

  const onInputTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState) => {
        return { ...prevState, title: e.target.value };
      });
      checkSubmitCondition();
    },
    [formData]
  );

  const onInputContext = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prevState) => {
        return { ...prevState, contexts: e.target.value };
      });
      checkSubmitCondition();
    },
    [formData]
  );

  const onPointerOutContext = useCallback(() => {
    const tags = getHashTag(formData.contexts);
    setFormData((prevState) => {
      return { ...prevState, tags: tags ? tags : null };
    });
    checkSubmitCondition();
  }, [formData]);

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
            autoFocus={true}
            placeholder={"제목을 입력해주세요."}
          />

          <Label>내용</Label>
          <TextArea
            id={"context"}
            value={formData.contexts ?? undefined}
            onChange={onInputContext}
            onPointerOut={onPointerOutContext}
            placeholder={"내용을 입력해주세요."}
          />
          <HashTagContainer style={{ paddingTop: "10px" }}>
            {formData.tags?.map((value) => {
              return (
                <HashTag
                  key={generateUniqueID()}
                  text={value}
                  unClickable={true}
                />
              );
            })}
          </HashTagContainer>
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
                transition={spring}
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
                transition={spring}
                animate={onlyForAnonymous ? "on" : "off"}
                variants={HandleVariant}
              />
            </SwitchDiv>
          </SwitchWrapper>
          <SubmitButton
            type={"submit"}
            disabled={disableSubmit}
            animate={disableSubmit ? "off" : "on"}
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
