import React, { useCallback, useState } from "react";
import {
  Column,
  Container,
  InputBox,
  Tag,
  InputLabel,
  ArrowButton,
  GlassButton,
  Header,
  YearSelector,
  CheckButton,
  Error,
} from "./styles";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import image from "../../../public/bob.png";
import { BottomButton } from "../Login/styles";

const SignUp = () => {
  const navigate = useNavigate();
  const selectList = [
    "연도를 선택해주세요!",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
  ];

  const [pageNum, setPageNum] = useState(1);

  const [ShowModal, SetShowModal] = useState(false);

  const [Year, setYear] = useState("");
  const [School, setSchool] = useState("");
  const [inputId, setInputId] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  //for Signup

  //for password check

  const [YearError, setYearError] = useState(false);
  const [SchoolError, setSchoolError] = useState(false);
  const [IdPass, setIdPass] = useState(false);
  const [mismatch, setMismatch] = useState(false);
  //for error message

  const find_school = () => {
    navigate(-1);
  };

  const showModal = () => {
    SetShowModal(true);
  };

  const onCloseModal = useCallback(() => {
    SetShowModal(false);
  }, []);

  const handleSelect = (e: any) => {
    setYear(e.target.value);
  };

  const verify_Exist_Id = useCallback(() => {
    //여기서 id verification쏴주면 될듯...
    if (true) {
      //아이디 검증되었을 시
      setIdPass(true);
    }
  }, [inputId, IdPass]);

  const onSubmit1 = useCallback(() => {
    console.log(Year);
    if (Year && Year != "연도를 선택해주세요!" && School) setPageNum(2);
    else {
      if (!Year || Year == "연도를 선택해주세요!") setYearError(true);
      if (!School) setSchoolError(true);
    }
  }, [Year, School]);

  const onSubmit2 = useCallback(() => {
    //1. 아이디통과 여부 2. 비밀번호 매칭 여부
    if (password && password == checkPassword && IdPass) {
      setPageNum(3);
    }
    if (!password) setMismatch(true);
    else if (password != checkPassword) {
      setMismatch(true);
    }
  }, [inputId, password, checkPassword]);

  const onSubmit3 = useCallback(() => {
    //이메일 check, 학교이메일인지 검증도 여기서
    //만약 성립시 server에 요청까지
    setPageNum(4);
  }, [email]);

  return (
    <Container>
      {pageNum == 1 && (
        <Column>
          <Header>회원가입</Header>
          <InputLabel>
            <Tag>입학년도</Tag>
            <YearSelector
              onChange={handleSelect}
              placeholder={"연도를 선택해주세요"}
              value={Year}
            >
              {selectList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </YearSelector>
          </InputLabel>
          <InputLabel>
            <Tag>학교</Tag>
            <InputBox
              value={School}
              placeholder={"학교를 입력해주세요"}
              onChange={(e) => setSchool(e.target.value)}
            ></InputBox>
            {/*<Modal isVisible={ShowModal}>*/}
            {/*  <select>*/}
            {/*    <option value="1">test</option>*/}
            {/*  </select>*/}
            {/*</Modal>*/}
            <GlassButton onClick={find_school} />
          </InputLabel>
          <BottomButton onClick={onSubmit1}>다음</BottomButton>
          {YearError && (
            <Error style={{ marginLeft: "65%" }}>
              학번이 선택되지 않았습니다!
            </Error>
          )}
          {SchoolError && (
            <Error style={{ marginLeft: "65%" }}>
              학교가 선택되지 않았습니다!
            </Error>
          )}
        </Column>
      )}
      {pageNum == 2 && (
        <Column>
          <Header>회원가입</Header>
          <InputLabel>
            <Tag>아이디</Tag>
            <InputBox
              value={inputId}
              disabled={IdPass ? true : false}
              placeholder={"아이디"}
              onChange={(e) => {
                setInputId(e.target.value);
              }}
              style={{ width: "55%" }}
            ></InputBox>
            <CheckButton
              style={{
                backgroundColor: IdPass ? "#34A9AB" : "#b4b4b4",
              }}
              onClick={() => setIdPass(!IdPass)}
              disabled={IdPass ? true : false}
            >
              중복확인
            </CheckButton>
          </InputLabel>
          <InputLabel>
            <Tag>비밀번호</Tag>
            <InputBox
              value={password}
              type={"password"}
              placeholder={"비밀번호"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></InputBox>
          </InputLabel>
          <InputLabel>
            <Tag>비밀번호 확인</Tag>
            <InputBox
              value={checkPassword}
              type={"password"}
              placeholder={"비밀번호 확인"}
              onChange={(e) => setCheckPassword(e.target.value)}
            ></InputBox>
          </InputLabel>
          {mismatch && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!IdPass && <Error>아이디가 확인되지 않았습니다</Error>}
          <BottomButton onClick={onSubmit2}>다음</BottomButton>
        </Column>
      )}
      {pageNum == 3 && (
        <Column>
          <Header>회원가입</Header>
          <InputLabel>
            <Tag>학교 이메일</Tag>
            <InputBox
              value={email}
              placeholder={"이메일"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></InputBox>
          </InputLabel>
          <BottomButton onClick={onSubmit3}>메일전송</BottomButton>
        </Column>
      )}
      {pageNum == 4 && (
        <Column>
          <Header>회원가입</Header>
          <img src={"../../../public/bob.png"} />
          <div
            style={{
              position: "relative",
              width: "60%",
              marginLeft: "20%",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            인증 이메일이 전송되었습니다!
          </div>
          <div
            style={{
              position: "relative",
              width: "60%",
              marginLeft: "20%",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              paddingTop: "12px",
            }}
          >
            이메일에서 회원가입을 완료해주세요!
          </div>
          <BottomButton onClick={onSubmit1}>홈으로!</BottomButton>
        </Column>
      )}
    </Container>
  );
};

export default SignUp;
