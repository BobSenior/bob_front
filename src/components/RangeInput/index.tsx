/** @jsxImportSource @emotion/react */
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { css } from "@emotion/react";

const WrapperCSS = css`
  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
`;

const SpanCSS = css`
  padding: 0 5px;
  text-align: center;
`;

const RangeInputCSS = css`
  -webkit-appearance: none;
  border-radius: 5px;
  background-color: rgba(182, 209, 215, 0.3);
  accent-color: var(--basic-color);
`;

interface props {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

const RangeInput = ({ value, onChange, min, max }: props) => {
  const minNum = useRef<number>(min ? min : 2);
  const maxNum = useRef<number>(max ? max : 16);

  return (
    <div css={WrapperCSS}>
      <input
        value={value}
        type={"range"}
        css={RangeInputCSS}
        min={minNum.current}
        max={maxNum.current}
        onChange={onChange}
      />
      <span css={SpanCSS}>{value}</span>
    </div>
  );
};

export default RangeInput;
