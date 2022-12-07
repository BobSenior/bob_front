import Modal from "../Modal";
import React, { Dispatch, SetStateAction, useState } from "react";
import { SearchContainer } from "../LocationSetModal/style";
import { DepartmentBtn, Header, Wrapper } from "./style";
import { Scrollbars } from "react-custom-scrollbars-2";

interface deportmentType {
  department: string;
  clickable: boolean;
}

const deportmentSet: deportmentType[] = [
  { department: "인문대학", clickable: false },
  { department: "국어국문학과", clickable: true },
  { department: "영어영문학과", clickable: true },
  { department: "유럽문화학부", clickable: true },
  { department: "아시아문화학부", clickable: true },
  { department: "철학과", clickable: true },
  { department: "역사학과", clickable: true },
  { department: "사회과학대학", clickable: false },
  { department: "정치국제학과", clickable: true },
  { department: "공공인재학부", clickable: true },
  { department: "심리학과", clickable: true },
  { department: "문헌정보학과", clickable: true },
  { department: "사회복지학부", clickable: true },
  { department: "미디어커뮤니케이션학부", clickable: true },
  { department: "도시계획·부동산학과", clickable: true },
  { department: "사회학과", clickable: true },
  { department: "사범대학", clickable: false },
  { department: "교육학과", clickable: true },
  { department: "유아교육과", clickable: true },
  { department: "영어교육과", clickable: true },
  { department: "체육교육과", clickable: true },
  { department: "자연과학대학", clickable: false },
  { department: "물리학과", clickable: true },
  { department: "화학과", clickable: true },
  { department: "생명과학과", clickable: true },
  { department: "수학과", clickable: true },
  { department: "생명공학대학", clickable: false },
  { department: "생명자원공학부", clickable: true },
  { department: "식품공학부", clickable: true },
  { department: "시스템생명공학과", clickable: true },
  { department: "공과대학", clickable: false },
  { department: "사회기반시스템공학부", clickable: true },
  { department: "건축학부", clickable: true },
  { department: "화학신소재공학부", clickable: true },
  { department: "기계공학부", clickable: true },
  { department: "에너지시스템공학부", clickable: true },
  { department: "첨단소재공학과", clickable: true },
  { department: "창의ICT공과대학", clickable: false },
  { department: "전자전기공학부", clickable: true },
  { department: "융합공학부", clickable: true },
  { department: "차세대반도체학과", clickable: true },
  { department: "소프트웨어대학", clickable: false },
  { department: "소프트웨어학부", clickable: true },
  { department: "AI학과", clickable: true },
  { department: "경영경제대학", clickable: false },
  { department: "경영학부", clickable: true },
  { department: "경제학부", clickable: true },
  { department: "응용통계학과", clickable: true },
  { department: "광고홍보학과", clickable: true },
  { department: "국제물류학과", clickable: true },
  { department: "지식경영학부", clickable: true },
  { department: "산업보안학과", clickable: true },
  { department: "의과대학", clickable: false },
  { department: "의학부", clickable: true },
  { department: "약학대학", clickable: false },
  { department: "약학부", clickable: true },
  { department: "적십자간호대학", clickable: false },
  { department: "간호학과", clickable: true },
];

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
  setDeportment: Dispatch<SetStateAction<string>>;
}
const SchoolSetModal = ({ setShow, setDeportment }: Props) => {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <Modal setShow={setShow}>
      <Wrapper>
        <Header>
          <SearchContainer>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type={"search"}
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                placeholder={"학과/학부명을 검색해주세요."}
              />
            </form>
          </SearchContainer>
        </Header>
        <Scrollbars height={200}>
          {deportmentSet
            .filter((value) => {
              if (!value.clickable) return true;
              return value.department.includes(searchInput);
            })
            .map((value) => {
              return (
                <DepartmentBtn
                  value={value.department}
                  disabled={!value.clickable}
                  onTap={
                    value.clickable
                      ? () => {
                          setDeportment(value.department);
                          setShow(false);
                        }
                      : undefined
                  }
                  whileTap={
                    value.clickable
                      ? {
                          scale: 0.95,
                          backgroundColor: "var(--basic-color)",
                        }
                      : undefined
                  }
                >
                  {value.department}
                </DepartmentBtn>
              );
            })}
        </Scrollbars>
      </Wrapper>
    </Modal>
  );
};

export default SchoolSetModal;
