import React, { useCallback, useState } from "react";
import {
  ArrowButton,
  Column,
  Container,
  GlassButton,
  Header,
  InputBox,
  InputLabel,
  Tag,
} from "../SignUp/styles";
import Modal from "../../components/Modal";
import { BottomButton } from "../LogIn/styles";
import { useNavigate } from "react-router-dom";
import { CheckButton, CheckIcon, Error } from "./styles";

const SignUp2 = () => {
  const navigate = useNavigate();

  const [inputId, setInputId] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [Pass, setPass] = useState(false);
  const [missmatch, setMissMatch] = useState(false);

  const verify_Exist_Id = useCallback(() => {
    //여기서 id verification쏴주면 될듯...
  }, []);

  return (
    <Container>
      <Column>
        <Header>회원가입</Header>
        <InputLabel>
          <Tag>아이디</Tag>
          <InputBox value={"아이디"} style={{ width: "55%" }}></InputBox>
          <CheckButton
            style={{
              backgroundColor: Pass ? "#34A9AB" : "#b4b4b4",
            }}
            onClick={verify_Exist_Id}
          >
            중복확인
          </CheckButton>
        </InputLabel>
        <InputLabel>
          <Tag>비밀번호</Tag>
          <InputBox value={"비밀번호"}></InputBox>
        </InputLabel>
        <InputLabel>
          <Tag>비밀번호 확인</Tag>
          <InputBox value={"비밀번호 확인"}></InputBox>
        </InputLabel>
        {missmatch && <Error>비밀번호가 일치하지 않습니다.</Error>}
        <BottomButton onClick={() => navigate("/signup2")}>다음</BottomButton>
      </Column>
    </Container>
  );
};
export default SignUp2;
