import React, { useCallback, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import kakaoLoginImg from "../../assets/images/kakao_login_medium_narrow.png";
import {
  ArrowBotton,
  BottomButton,
  Header,
  Input,
  LinkContainer,
  Form,
  Finding_string,
  LoginPageWrapper,
  FormSection,
  SocialLoginContainer,
} from "./styles";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [logInError, setLogInError] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      setLogInError(false);
      // axios
      //   .post("URL FOR LOGIN CHECK", { id, password })
      //   .then((response) => {})
      //   .catch((error) => {});
    },
    [id, password]
  );

  return (
    <LoginPageWrapper>
      <Header>밥선배</Header>
      <FormSection>
        <Form onSubmit={onSubmit}>
          <Input
            value={id}
            placeholder={"아이디"}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <Input
            value={password}
            placeholder={"비밀번호"}
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Finding_string onClick={() => navigate(`/finding`)}>
            아이디/비밀번호 찾기
          </Finding_string>
          <BottomButton>로그인</BottomButton>
        </Form>
      </FormSection>
      <LinkContainer>
        밥선배가 처음이신가요?&nbsp;
        <Link to="/signup">회원가입</Link>
      </LinkContainer>
      <SocialLoginContainer>
        <span>소셜 로그인</span>
        <div>
          <img src={kakaoLoginImg} alt={"카카오 소셜 로그인"} />
        </div>
      </SocialLoginContainer>
    </LoginPageWrapper>
  );
};

export default Login;
