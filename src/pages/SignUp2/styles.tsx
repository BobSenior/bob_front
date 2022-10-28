import styled from "@emotion/styled";
import Glass from "../../glass.svg";

export const CheckButton = styled.button`
  font-weight: bold;
  position: absolute;
  background-color: #b4b4b4;
  border: none;
  outline: none;
  border-radius: 1px;
  top: 72px;
  height: 40px;
  width: 100px;
  right: 11%;
  color: white;
  cursor: pointer;
`;

export const Error = styled.div`
  color: #e01e5a;
  margin: 8px 0 16px;
  font-weight: bold;
`;

export const CheckIcon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;
