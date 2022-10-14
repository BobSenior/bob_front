import styled from "@emotion/styled/macro";

export const Header = styled.header`
  background-color: #23a1bd;
  height: 38px;
  position: fixed;
  width: 100%;
  text-align: center;
  & span {
    font-size: 30px;
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
  border-top: 40px;
  height:4000px;
`;

export const LinkedButton = styled.div`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.75em;
  :hover {
    background-color: slategrey;
  }
`;

export const ProfileMenu = styled.div`
  position: absolute;
  top: 35px;
  right: 30px;
  diplay: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  
  ${LinkedButton}
`;


export const Bottom = styled.div`
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 35px;
  background-color: #b870e8;
  
  & div {
    min-width: 35px;
    height: 100%;
    text-align: center;
    
  }
`;