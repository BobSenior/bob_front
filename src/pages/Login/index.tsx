import React, { useCallback, useContext, useState } from "react";
import { useNavigate, Navigate, NavLink } from "react-router-dom";
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
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { postFetcher } from "../../utils/fetchers";
import { BaseResponse } from "../../types/db";
import { toast, ToastContainer } from "react-toastify";
import useMySWR from "../../data/useMySWR";
import GlobalContext from "../../hooks/GlobalContext";

const Login = () => {
  const navigate = useNavigate();
  const { myData, setMyData } = useContext(GlobalContext);
  const { data, mutate, error, isValidating } = useMySWR();
  const [logInError, setLogInError] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      setLogInError(false);
      postFetcher
        .post(`/login`, {
          userId: id,
          password: password,
        })
        .then((response: AxiosResponse<BaseResponse<any>>) => {
          if (!response.data.isSuccess) {
            toast.error(response.data.message);
            setId("");
            setPassword("");
          } else {
            setMyData(response.data.result);
          }
        });
    },
    [id, password]
  );

  return (
    <LoginPageWrapper>
      <Header>
        <NavLink to={"/"} end={true}>
          밥선배
        </NavLink>
      </Header>
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
      <ToastContainer />
    </LoginPageWrapper>
  );
};

export default Login;
