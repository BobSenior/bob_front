import React from "react";
import { Button, Column, Container, Header, JoinDiv, Section } from "./style";
import { useNavigate } from "react-router-dom";

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
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              <span>로그인 하러가기</span>
            </Button>
            <Button
              onClick={() => {
                navigate("/signup");
              }}
            >
              <span>회원가입 하러가기</span>
            </Button>
            <Button
              onClick={() => {
                navigate("/main");
              }}
            >
              <span>(개발용)메인으로 가기</span>
            </Button>
          </JoinDiv>
        </Container>
      </Section>
    </div>
  );
};

export default Home;
