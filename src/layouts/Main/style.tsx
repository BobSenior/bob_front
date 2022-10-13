import styled from "@emotion/styled/macro";

export const Header = styled.header`
  background-color: #23a1bd;
  height: 40px;
  position: fixed;
  width: 100%;
  text-align: center;

  & div {
    display: flex;
    justify-content: center;
    align-content: flex-end;
    background-color: rgba(0, 0, 0, 0);
    width: 100%;
    & span {
      font-size: 30px;
    }
  }
`;

export const Profile = styled.div`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 5px;
  right: 16px;
  background-color: crimson;
`;

export const Body = styled.body`
  //display: flex;
  //flex: 1 1;
  border-top: 40px;
`;
