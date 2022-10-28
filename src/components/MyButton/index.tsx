import React, { MouseEvent } from "react";

interface Props {
  contents: String | null;
  onClick: (e: MouseEvent<HTMLElement>) => void;
}

const MyButton = ({ contents, onClick }: Props) => {
  return <button onClick={onClick}>{contents}</button>;
};

export default MyButton;
