import styled from "@emotion/styled/macro";

export const Header = styled.header`
  background-color: #23a1bd;
  height: 38px;
  position: fixed;
  width: 100%;
  text-align: center;
  & span {
    font-size: 30px;
    color: black;
    cursor: default;
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

export const Body = styled.body`
  padding-top: 38px;
  padding-bottom: 35px;
`;

export const LinkedButton = styled.div`
  padding: 15px 30px;
  border-radius: 6px;
  font-size: 0.75em;
  color: black;
  cursor: default;
  :hover {
    background-color: slategrey;
  }
`;

export const ProfileMenu = styled.div`
  position: absolute;
  top: 35px;
  right: 8px;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;

  ${LinkedButton}
`;

export const Bottom = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 35px;
  background-color: azure;
  cursor: default;
  & div {
    flex: 1 1 auto;
    height: 100%;
    text-align: center;
    :hover {
      color: white;
      background-color: slategrey;
      border-radius: 5px;
    }
  }
`;
