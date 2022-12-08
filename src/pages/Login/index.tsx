import React, { useCallback, useContext, useState, FormEvent } from "react";
import { useNavigate, Navigate, NavLink } from "react-router-dom";
import {
  BottomButton,
  Header,
  Input,
  LinkContainer,
  Form,
  Finding_string,
  LoginPageWrapper,
  FormSection,
} from "./styles";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { normalPostFetcher, postFetcher } from "../../utils/fetchers";
import { BaseResponse } from "../../types/db";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [logInError, setLogInError] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setLogInError(false);
      normalPostFetcher
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
            sessionStorage.setItem(
              "myData",
              JSON.stringify(response.data.result)
            );
            navigate("/main");
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
          <BottomButton>로그인</BottomButton>
        </Form>
      </FormSection>
      <LinkContainer>
        밥선배가 처음이신가요?&nbsp;
        <Link to="/signup">회원가입</Link>
      </LinkContainer>
      <ToastContainer />
    </LoginPageWrapper>
  );
};

export default Login;
