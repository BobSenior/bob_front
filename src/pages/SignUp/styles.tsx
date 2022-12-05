import styled from "@emotion/styled";
import Down from "../../assets/icons/down.svg";
import Glass from "../../assets/icons/glass.svg";

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  margin-top: 35px;
`;

export const Column = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 60vw;
  max-width: 500px;
  & > h1 {
    font-size: 86px;
  }
`;

export const Header = styled.header`
  text-align: center;
  height: 15vh;
  font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma,
    Arial, sans-serif;
  color: #23a1bd;
  font-weight: 1000;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: end;
`;

export const InputLabel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Tag = styled.label`
  //padding-top: 30px;
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  //padding-bottom: 9px;
  //padding-left: 3px;
  //margin-left: 10%;
`;

export const InputWrapper = styled.div`
  margin: 0 0 20px 10%;
  width: 100%;
  display: flex;
`;
export const InputBox = styled.input`
  border-radius: 2px;
  padding-left: 7px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 3px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  color: #b4b4b4;
  font-size: 20px;
  height: 50px;
  width: 70%;
  &:focus {
    color: black;
  }
`;

export const YearSelector = styled.select`
  appearance: none;
  background: url(https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg)
    no-repeat 95% 50%;
  border-radius: 2px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 3px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  width: 80%;
  height: 50px;
  margin-left: 10%;
  font-size: 20px;
  padding-left: 8px;
  padding-right: 101px;
  &:focus {
    color: black;
  }
`;

export const ArrowButton = styled.button`
  padding-left: 8px;
  background-image: url(${Down});
  background-color: white;
  border: none;
  position: absolute;
  border-radius: 5px;
  top: 72px;
  width: 30px;
  height: 34px;
  right: 11%;
  color: #61dafb;
  cursor: pointer;
`;

export const GlassButton = styled.button`
  background-image: url(${Glass});
  background-color: white;
  border: none;
  position: absolute;
  border-radius: 5px;
  top: 71112px;
  width: 30px;
  height: 32px;
  right: 11%;
  color: #61dafb;
  cursor: pointer;
`;

export const CheckButton = styled.button`
  font-weight: bold;
  background-color: #b4b4b4;
  border: none;
  outline: none;
  border-radius: 1px;
  margin-left: 3px;
  color: white;
  cursor: pointer;
`;

export const Error = styled.div`
  color: #e01e5a;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 8px;
  margin-bottom: 16px;
  width: 60%;
  font-size: 15px;
`;

export const CheckIcon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const SearchBtn = styled.button`
  height: 50px;
  padding-left: 7px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 3px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
`;

export const Wrapper = styled.div`
  width: 100%;
`;
