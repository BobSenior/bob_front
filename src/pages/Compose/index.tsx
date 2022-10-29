import { useState } from "react";
import {
  ComposeForm,
  ComposeMain,
  ComposeWrapper,
  ScrollProgressBar,
} from "./style";
import { useScroll } from "framer-motion";

interface composeData {
  title: string | null;
  place: string | null;
  time: string | null;
  maxMember: number;
  contents: string | null;
  onlyForMyMajor: boolean;
  onlyForAnonymous: boolean;
}

const Compose = () => {
  const { scrollYProgress } = useScroll();
  const [title, setTitle] = useState<string>("");

  return (
    <ComposeWrapper>
      <ScrollProgressBar style={{ scaleX: scrollYProgress }} />
      <ComposeMain>
        <ComposeForm>
          <label>제목</label>
          <input />
          <label>내용</label>
          <input />
          <label>해시태그</label>
          <input />
          <label>장소</label>
          <input />
          <label>시간</label>
          <input />
          <label>최대 인원수</label>
          <input />
          <label>같은 학과만</label>
          <input />
          <label>익명 실명</label>
          <input />
        </ComposeForm>
      </ComposeMain>
    </ComposeWrapper>
  );
};
export default Compose;
