import styled from "@emotion/styled/macro";

export const MainBox = styled.div`
  display: flex;
  justify-content: center;
  & div {
    max-width: 1000px;
  }
`;

export const Button = styled.div`
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: #23a1bd;
    color: white;
    border-radius: 5px;
  }
`;

export const ProfileMenu = styled.div`
  position: absolute;
  top: 35px;
  right: 8px;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  ${Button} {
    font-size: 0.8em;
    padding: 15px 30px;
    width: 100px;
  }
`;

export const ProfileImg = styled.img`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 28px;
  top: 5.5px;
  right: 8px;
`;

export const Header = styled.div`
  background-color: rgba(182, 209, 215, 0.75);
  height: 38px;
  position: fixed;
  width: 100%;
  text-align: center;
  & span {
    font-size: 30px;
    color: black;
    cursor: default;
  }
  ${ProfileMenu}
`;

export const Body = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 38px;
  padding-bottom: 35px;
  width: 100%;
`;

export const Bottom = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 38px;
  background-color: rgba(182, 209, 215, 0.75);
  cursor: default;
  ${Button}
`;
