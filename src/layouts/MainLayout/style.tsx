import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";

export const MainBox = styled.div`
  display: flex;
  justify-content: center;
  min-width: 320px;
  & div {
    max-width: 1200px;
  }
`;

export const AlarmMark = styled.div`
  width: 11px;
  height: 11px;
  border-radius: 11px;
  background-color: #ff3434;
  color: white;
  z-index: 100;
`;

export const IconsContainer = styled.div`
  position: fixed;
  right: 0;
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-right: 10px;

  & button {
    width: 32px;
    height: 32px;
    border-radius: 32px;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    padding: 0;
    cursor: pointer;
    ${AlarmMark} {
      position: absolute;
      top: 1.5px;
      right: 46px;
    }
    & .alarm-image {
      position: relative;
      top: 1px;
      width: 24px;
      height: 24px;
      border-radius: 24px;
    }
    & .avatar-image {
      width: inherit;
      height: inherit;
      border-radius: inherit;
    }
    :hover {
      background-color: rgba(128, 128, 128, 0.4);
    }
  }
`;

export const Header = styled.header`
  background-color: var(--basic-back-color);
  height: 38px;
  position: fixed;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  & .header-span {
    cursor: default;
    font-size: 30px;
    text-align: center;
    & i {
      font-size: 5px;
    }
  }
`;

export const Body = styled.div`
  padding-top: 38px;
  padding-bottom: 35px;
  width: 100%;
  z-index: 0;
`;

export const Bottom = styled.footer`
  position: fixed;
  display: flex;
  justify-content: space-around;
  bottom: 0;
  width: 100%;
  height: 38px;
  z-index: 100;
  background-color: var(--basic-back-color);
  & div {
    width: 100%;
  }
`;
