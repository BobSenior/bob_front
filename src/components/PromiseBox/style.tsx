import styled from "@emotion/styled/macro";
import { jsx, css, Global, ClassNames } from "@emotion/react";

export const SpanFont = css`
  font-size: 0.2em;
`;

export const TopContext = styled.div`
  display: flex;
  width: 100%;
  background-color: RGB(35, 161, 189, 15%);
  justify-content: flex-start;
  align-items: flex-end;
  & span {
    display: block;
  }
`;
export const MiddleContext = styled.div`
  display: flex;
  width: fit-content;
  background-color: RGB(35, 161, 189, 15%);
  align-items: flex-end;
  & span {
    display: block;
  }
`;
export const BottomContext = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-content: center;
  background-color: RGB(35, 161, 189, 15%);
  & span {
    display: block;
    font-size: 0.5em;
  }
`;

export const PromiseImg = styled.img`
  display: block;
  width: 80px;
  height: 80px;
  background-color: red;
`;

export const PromiseContexts = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  flex-grow: 1;
  row-gap: 3px;
  align-content: stretch;
`;

export const PromiseHead = styled.div`
  display: flex;
  column-gap: 5px;
  justify-items: flex-start;
`;

export const PromiseTail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const PBox = styled.div`
  min-width: 320px;
  min-height: 50px;
  font-family: "HanziPen SC";
`;
