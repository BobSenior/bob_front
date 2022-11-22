import React from "react";
import { motion } from "framer-motion";
import { Column, Container, JoinDiv, Section } from "./style";
import { useNavigate } from "react-router-dom";
import ColoredBtn from "../../assets/buttons/ColoredBtn";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%" }}>
      <Section>
        <Container>
          <Column>
            <motion.h4
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 0 }}
            >
              선배랑 밥먹고 싶을 때,
            </motion.h4>
            <motion.h4
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ marginBottom: 0 }}
            >
              후배 밥 사주고 싶을 때,
            </motion.h4>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              밥선배
            </motion.h1>
          </Column>
          <JoinDiv>
            <ColoredBtn
              width={"80%"}
              height={"50px"}
              onClick={() => {
                navigate("/login");
              }}
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
