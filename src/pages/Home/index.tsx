import React from "react";
import { Column, Container, Header, JoinDiv, Section } from "./style";
import { useNavigate } from "react-router-dom";
import ColoredBtn from "../../assets/buttons/ColoredBtn";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header>
        {/*<nav>*/}
        {/*  <a href="/story">*/}
        {/*    <span>Out Story</span>*/}
        {/*  </a>*/}
        {/*  <a href="/collection">*/}
        {/*    <span>Collection</span>*/}
        {/*  </a>*/}
        {/*  <a href="/contact">*/}
        {/*    <span>Contact</span>*/}
        {/*  </a>*/}
        {/*</nav>*/}
      </Header>
      <Section>
        <Container>
          <Column>
            <h1>밥선배</h1>
            <h4>선배! 밥 사주세요.</h4>
          </Column>
          <JoinDiv>
            <ColoredBtn
              width={"80%"}
              height={"50px"}
              onClick={() => {
                navigate("/login");
              }}
              animate={""}
              variants={""}
              isHover={true}
              isTap={true}
            >
              <span>로그인</span>
            </ColoredBtn>
            <ColoredBtn
              width={"80%"}
              height={"50px"}
              onClick={() => {
                navigate("/signup");
              }}
              animate={""}
              variants={""}
              isHover={true}
              isTap={true}
            >
              <span>회원가입</span>
            </ColoredBtn>
            <ColoredBtn
              width={"80%"}
              height={"50px"}
              onClick={() => {
                navigate("/main");
              }}
              animate={""}
              variants={""}
              isHover={true}
              isTap={true}
            >
              <span>(개발용)메인으로 가기</span>
            </ColoredBtn>
          </JoinDiv>
        </Container>
      </Section>
    </div>
  );
};

export default Home;
