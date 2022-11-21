import React, { useCallback, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
//import axios from 'axios';
import {
  ArrowBotton,
  BottomButton,
  Header,
  Input,
  LinkContainer,
  Form,
  Finding_string,
} from "../Login/styles";
//import useSWR from 'swr';
import { Link } from "react-router-dom";
import useSWR from "swr";

const Login = () => {
  const navigate = useNavigate();
  //const {data, error} = useSWR()
  const [logInError, setLogInError] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  //const [id, onChangeId] = useInput('');
  //const [password, onChangePassword] = useInput('');

  /*const onSubmit = useCallback(
        (e:any)=>{
            e.preventDefault();
            setLogInError(false);
            axios
            .post(
                'URL FOR LOGIN CHECK',
                {id,password},
                {
                    withCredentials: true,
                },
            )
            .then((response)=>{
                mutate(response.data,false);
            })
            .catch((error)=>{
                setLogInError(error.response?.data?.statusCode === 401);
            });
        }
    ,[id,password]);*/

  /* if(data === undefined){
        return <div>로딩중...</div>
    }
    if(data){
        return <Navigate to="/"></Navigate>;
    }*/

  return (
    <div>
      <Header>밥선배</Header>
      <Form>
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
        <LinkContainer>
          밥선배에 처음이신가요?&nbsp;
          <Link to="/signup">회원가입</Link>
        </LinkContainer>
        <BottomButton>로그인</BottomButton>
      </Form>
    </div>
  );
};

export default Login;
