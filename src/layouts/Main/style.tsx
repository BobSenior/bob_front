import styled from "@emotion/styled/macro";

export const Header = styled.header`
  background-color: #23a1bd;
  height: 40px;
  position: fixed;
  width: 100%;
  text-align: center;
  & span {
    font-size: 30px;
  }
`;

export const Profile = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 28px;
  top: 5px;
  right: 8px;
  background-color: crimson;
`;

export const Body = styled.body`
  border-top: 40px;
`;
