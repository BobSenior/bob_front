import REACT, { useCallback, useState } from "react";
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
} from "./styles";
//import useSWR from 'swr';
import MyHeader from "../../components/MyHeader";
import MyButton from "../../components/MyButton";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [logInError, setLogInError] = useState(false);
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
        <Input value={"아이디"} />
        <Input value={"비밀번호"} />
        <Finding_string>아이디/비밀번호 찾기</Finding_string>
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
