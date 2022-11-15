import REACT, { useCallback, useState } from "react";
import { Container, InputBox, InputLabel } from "../SignUp/styles";
import { Column, Finding_button, Header } from "./styles";
import HorizonLine from "../../components/Horizon";
import { Input } from "../LogIn/styles";

const FindingIdPw = () => {
  const [part, setPart] = useState(1);
  const [passwordSubPart, setPasswordSubPart] = useState(1);
  //1 -> 초기화면 2 -> 아이디찾기 3 -> 비밀번호 찾기

  const changePart = useCallback((number: number) => {
    //이메일 check, 학교이메일인지 검증도 여기서
    //만약 성립시 server에 요청까지
    setPart(number);
  }, []);
  return (
    <Container>
      {part == 1 && (
        <Column>
          <Header style={{ marginBottom: "40px" }}>
            아이디 / 비밀번호 찾기
          </Header>
          <Finding_button onClick={() => changePart(2)}>
            아이디를 잊어버렸어요
          </Finding_button>
          <Finding_button onClick={() => changePart(3)}>
            비밀번호를 잊어버렸어요
          </Finding_button>
        </Column>
      )}
      {part == 2 && (
        <Column>
          <Header>아이디 찾기</Header>
          <InputLabel>
            <div>hello</div>
            <InputBox></InputBox>
          </InputLabel>
        </Column>
      )}
      {part == 3 && (
        <Column>
          <Header>비밀번호 찾기</Header>
        </Column>
      )}
    </Container>
  );
};

export default FindingIdPw;
