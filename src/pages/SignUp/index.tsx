import React, { useCallback, useState } from "react";
import {
  Column,
  Container,
  InputBox,
  Tag,
  InputLabel,
  ArrowButton,
  GlassButton,
  Header,
} from "./styles";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import MyModal from "../../components/Modal";
import YearSelectionModal from "../../components/Modal";
import Login from "../LogIn";
import Modal from "../../components/Modal";
import { BottomButton } from "../LogIn/styles";
import HorizonLine from "../../components/Horizon";
import SignUp2 from "../SignUp2";

const SignUp = () => {
  const navigate = useNavigate();
  const [ShowModal, SetShowModal] = useState(false);

  const find_school = () => {
    navigate(-1);
  };

  const showModal = () => {
    SetShowModal(true);
  };

  const onCloseModal = useCallback(() => {
    SetShowModal(false);
  }, []);

  return (
    <Container>
      <Column>
        <Header>회원가입</Header>
        <InputLabel>
          <Tag>입학년도</Tag>
          <InputBox value={"연도 선택 (학번)"}></InputBox>
          <ArrowButton onClick={showModal} />
          <Modal show={ShowModal} onCloseModal={onCloseModal}>
            hello
          </Modal>
        </InputLabel>
        <InputLabel>
          <Tag>학교</Tag>
          <InputBox value={"학교 이름을 검색하세요"}></InputBox>
          <GlassButton onClick={find_school} />
        </InputLabel>
        <BottomButton onClick={() => navigate("/signup2")}>다음</BottomButton>
      </Column>
    </Container>
  );
};

export default SignUp;
