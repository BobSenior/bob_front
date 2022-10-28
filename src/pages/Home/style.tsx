import styled from "@emotion/styled/macro";

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  align-items: center;
  justify-content: center;
  position: absolute;
  row-gap: 24px;
  & > nav {
    display: flex;
    flex-direction: row;
    column-gap: 36px;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 80px;
  padding-right: 24px;
  padding-bottom: 80px;
  padding-left: 24px;
  background-attachment: fixed;
  background-color: #b6d1d7;
  color: #23a1bd;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 20%;
`;
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  width: 100%;
  align-items: stretch;
  justify-content: center;
  max-width: 1240px;
`;

export const Column = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  min-width: 320px;
  flex-direction: column;
  & > h1 {
    font-size: 86px;
  }
`;

export const JoinDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: 320px;
  padding: 20px 0px;
  row-gap: 5px;
  justify-content: center;
`;

export const Button = styled.div`
  display: flex;
  width: 80%;
  height: 50px;
  background-color: #23a1bd;
  color: white;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  max-width: 350px;
`;