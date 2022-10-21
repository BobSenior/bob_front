import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";

export const SpanCSS = css`
  font-size: 0.5em;
`;

export const HashTagContainer = styled.div`
  display: flex;
  column-gap: 0.5em;
  font-size: 0.75em;
`;

export const ArrowDiv = styled.div`
  width: 0;
  height: 0;
  border-bottom: 8px solid #23a1bd;
  border-top: 8px solid transparent;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-radius: 3px;
`;

export const BottomRightDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: xx-small;
`;
export const BottomLeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.45em;
  justify-content: space-around;
`;

export const TopContext = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 1em;
  & span {
    display: block;
  }
`;
export const MiddleContext = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-items: flex-end;
  & span {
    display: block;
  }
`;
export const BottomContext = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
`;

export const PromiseImg = styled.img`
  display: block;
  width: 80px;
  height: 80px;
  background-color: #23a1bd;
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
  align-items: center;
  padding-top: 5px;
`;

export const PBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: center;
  width: 320px;
  min-height: 50px;
  font-family: "HanziPen SC";
  padding: 5px;
  border: rgba(0, 0, 0, 0.1) solid 0.5px;
  border-radius: 3px;
  height: fit-content;
  :hover {
    border: rgba(0, 0, 0, 0.5) solid 0.5px;
  }
`;
