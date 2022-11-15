import styled from "@emotion/styled/macro";

export const Finding_button = styled.button`
  position: relative;
  margin-top: 50px;
  width: 80%;
  height: 60px;
  left: 10%;
  background-color: #34a9ab;
  border-color: white;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 22px;
`;

export const Header = styled.header`
  font-family: "Roboto";
  text-align: center;
  position: relative;
  width: 80%;
  height: 11px;
  left: 10%;
  top: 10px;
  font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma,
    Arial, sans-serif;
  color: #23a1bd;
  font-weight: 700;
  font-size: 28px;
  line-height: 46px;
  letter-spacing: -0.75px;
  margin-top: 10px;
  padding-bottom: 40px;
`;

export const Column = styled.div`
  padding-top: 3%;
  display: flex;
  position: relative;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  min-width: 320px;
  flex-direction: column;
  & > h1 {
    font-size: 86px;
  }
`;
