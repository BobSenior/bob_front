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
  padding: 60px 0;
  background-attachment: fixed;
  background-color: var(--basic-back-color);
  color: var(--basic-color);
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 20%;
  background-image: url("https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80");
`;
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: stretch;
  justify-content: center;
  max-width: 1240px;
  padding-left: 20px;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const Column = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  min-width: 300px;
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
  max-width: 500px;
  padding: 20px 0;
  row-gap: 5px;
  justify-content: center;
`;
