import React, { useCallback, useState } from "react";
import {
  Column,
  Container,
  InputBox,
  Tag,
  InputLabel,
  Header,
  CheckButton,
  Error,
  Wrapper,
  SearchBtn,
  InputWrapper,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { BottomButton } from "../Login/styles";
import SearchSvg from "../../assets/icons/search-circle.svg";
import axios, { AxiosResponse } from "axios";
import { BaseResponse } from "../../types/db";
import { toast, ToastContainer } from "react-toastify";
import { normalPostFetcher } from "../../utils/fetchers";
import SchoolSetModal from "../../components/DeportmentSetModal";
import validator from "validator";

const selectList = [
  "연도를 선택해주세요!",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
];
const SignUp = () => {
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);
  const [ShowModal, SetShowModal] = useState(false);
  const [department, setDepartment] = useState<string>("");
  const [Year, setYear] = useState("");
  const [School, setSchool] = useState("중앙대학교");
  const [inputId, setInputId] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState<string>("");
  //for Signup

  //for password check

  const [YearError, setYearError] = useState(false);
  const [SchoolError, setSchoolError] = useState(false);
  const [IdPass, setIdPass] = useState(false);
  const [nicknamePass, setNicknamePass] = useState<boolean>(false);
  const [mismatch, setMismatch] = useState(false);
  const [showSchoolSetModal, setShowSchoolSetModal] = useState<boolean>(false);
  //for error message

  const find_school = () => {
    navigate(-1);
  };

  const showModal = () => {
    SetShowModal(true);
  };

  const onCloseModal = useCallback(() => {
    SetShowModal(false);
  }, []);

  const handleSelect = (e: any) => {
    setYear(e.target.value);
  };

  const verify_Exist_Id = useCallback(() => {
    if (validator.isAlphanumeric(inputId)) {
      axios
        .get(`/id/dupli?id=${inputId}`)
        .then((response: AxiosResponse<BaseResponse<any>>) => {
          if (!response.data.isSuccess) {
            toast.error(response.data.message);
            setInputId("");
          } else {
            setIdPass(true);
          }
        });
    }
  }, [inputId, IdPass]);

  const verify_Nickname_Id = useCallback(() => {
    axios
      .get(`/nickname/dupli?nickname=${nickname}`)
      .then((response: AxiosResponse<BaseResponse<any>>) => {
        if (!response.data.isSuccess) {
          toast.error(response.data.message);
          setNickname("");
        } else {
          setNicknamePass(true);
        }
      });
  }, [nickname, nicknamePass]);

  const onSubmit1 = useCallback(() => {
    console.log(department);
    if (department.length === 0) {
      toast.error("학과를 입력해 주세요!");
      return null;
    }
    if (Year.length === 0) {
      toast.error("학번을 입력해 주세요!");
      return null;
    }
    if (Year && Year != "연도를 선택해주세요!" && School) setPageNum(2);
    else {
      if (!Year || Year == "연도를 선택해주세요!") setYearError(true);
      if (!School) setSchoolError(true);
    }
  }, [Year, School, department]);

  const onSubmit2 = useCallback(() => {
    //1. 아이디통과 여부 2. 비밀번호 매칭 여부
    if (password && password == checkPassword && IdPass) {
      setPageNum(3);
    }
    if (!password) setMismatch(true);
    else if (password != checkPassword) {
      setMismatch(true);
    }
  }, [inputId, password, checkPassword]);

  const onSubmit3 = useCallback(() => {
    normalPostFetcher.post(`/signUp`, {
      email: email,
      userId: inputId,
      password: password,
      school: School,
      schoolId: Year,
      nickName: nickname,
      department: department,
    });
    //이메일 check, 학교이메일인지 검증도 여기서
    //만약 성립시 server에 요청까지
    if (!nicknamePass) {
      toast.error("닉네임 인증이 누락되었습니다!");
      return null;
    }
    if (email.length === 0) {
      toast.error("이메일을 입력해주세요!");
      return null;
    }
    setPageNum(4);
  }, [email]);

  return (
    <Wrapper>
      <Header>
        <span>회원가입</span>
      </Header>
      <Container>
        {pageNum == 1 && (
          <Column>
            <InputLabel>
              <Tag>학번</Tag>
              <InputWrapper>
                <InputBox
                  value={Year}
                  placeholder={"학번을 입력해주세요 (8글자)"}
                  onChange={(e) => setYear(e.target.value)}
                />
              </InputWrapper>
            </InputLabel>
            <InputLabel>
              <Tag>학교</Tag>
              <InputWrapper>
                <InputBox
                  value={School}
                  placeholder={"학교를 입력해주세요"}
                  onChange={(e) => setSchool(e.target.value)}
                  disabled={true}
                />
              </InputWrapper>
            </InputLabel>
            <InputLabel>
              <Tag>학과</Tag>
              <InputWrapper>
                <InputBox
                  value={department}
                  placeholder={"학과명를 입력해주세요"}
                  onChange={(e) => setDepartment(e.target.value)}
                  disabled={true}
                />
                <SearchBtn
                  onClick={() =>
                    setShowSchoolSetModal((prevState) => !prevState)
                  }
                >
                  <img
                    src={SearchSvg}
                    height={"35px"}
                    width={"35px"}
                    alt={"search"}
                  />
                </SearchBtn>
              </InputWrapper>
            </InputLabel>
            <BottomButton onClick={onSubmit1}>다음</BottomButton>
            {YearError && (
              <Error style={{ marginLeft: "65%" }}>
                학번이 선택되지 않았습니다!
              </Error>
            )}
            {SchoolError && (
              <Error style={{ marginLeft: "65%" }}>
                학교가 선택되지 않았습니다!
              </Error>
            )}
          </Column>
        )}
        {pageNum == 2 && (
          <Column>
            <InputLabel>
              <Tag>아이디</Tag>
              <InputWrapper>
                <InputBox
                  value={inputId}
                  disabled={IdPass ? true : false}
                  placeholder={"아이디"}
                  onChange={(e) => {
                    setInputId(e.target.value);
                  }}
                />
                <CheckButton
                  style={{
                    backgroundColor: IdPass ? "#34A9AB" : "#b4b4b4",
                  }}
                  onClick={verify_Exist_Id}
                  disabled={IdPass ? true : false}
                >
                  중복확인
                </CheckButton>
              </InputWrapper>
            </InputLabel>
            <InputLabel>
              <Tag>비밀번호</Tag>
              <InputWrapper>
                <InputBox
                  value={password}
                  type={"password"}
                  placeholder={"비밀번호"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </InputWrapper>
            </InputLabel>
            <InputLabel>
              <Tag>비밀번호 확인</Tag>
              <InputWrapper>
                <InputBox
                  value={checkPassword}
                  type={"password"}
                  placeholder={"비밀번호 확인"}
                  onChange={(e) => setCheckPassword(e.target.value)}
                />
              </InputWrapper>
            </InputLabel>
            {mismatch && <Error>비밀번호가 일치하지 않습니다.</Error>}
            {!IdPass && <Error>아이디가 확인되지 않았습니다</Error>}
            <BottomButton onClick={onSubmit2}>다음</BottomButton>
          </Column>
        )}
        {pageNum == 3 && (
          <Column>
            <InputLabel>
              <Tag>닉네임</Tag>
              <InputWrapper>
                {!nicknamePass ? (
                  <InputBox
                    value={nickname}
                    placeholder={"닉네임"}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                  />
                ) : (
                  <InputBox
                    value={nickname}
                    placeholder={"닉네임"}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                    disabled
                  />
                )}
                <CheckButton
                  style={{
                    backgroundColor: nicknamePass ? "#34A9AB" : "#b4b4b4",
                  }}
                  onClick={verify_Nickname_Id}
                  disabled={nicknamePass ? true : false}
                >
                  중복확인
                </CheckButton>
              </InputWrapper>
            </InputLabel>
            <InputLabel>
              <Tag>학교 이메일</Tag>
              <InputWrapper>
                <InputBox
                  value={email}
                  placeholder={"이메일"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </InputWrapper>
            </InputLabel>
            <BottomButton onClick={onSubmit3}>메일전송</BottomButton>
          </Column>
        )}
        {pageNum == 4 && (
          <Column>
            <img src={"../../../public/bob.png"} />
            <div
              style={{
                position: "relative",
                width: "60%",
                marginLeft: "20%",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              인증 이메일이 전송되었습니다!
            </div>
            <div
              style={{
                position: "relative",
                width: "60%",
                marginLeft: "20%",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                paddingTop: "12px",
              }}
            >
              이메일에서 회원가입을 완료해주세요!
            </div>
            <BottomButton onClick={() => navigate("/")}>홈으로!</BottomButton>
          </Column>
        )}
      </Container>
      <ToastContainer />
      {showSchoolSetModal && (
        <SchoolSetModal
          setShow={setShowSchoolSetModal}
          setDeportment={setDepartment}
        />
      )}
    </Wrapper>
  );
};

export default SignUp;
