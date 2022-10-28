import styled from "@emotion/styled";
import Down from "../../down.svg";
import Glass from "../../glass.svg";

export const Container = styled.div`
  padding-top: 100px;
  display: flex;
  flex-wrap: wrap-reverse;
  width: 100%;
  height: 80vh;
  justify-content: center;
  padding-top: 50px;
`;

export const Column = styled.div`
  padding-top: 5%;
  display: flex;
  position: relative;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  min-width: 320px;
  flex-direction: column;
  & > h1 {
    font-size: 86px;
  }
`;

export const Header = styled.header`
  font-family: "Roboto";
  text-align: center;
  position: absolute;
  width: 80%;
  height: 11px;
  left: 10%;
  top: 10px;
  font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma,
    Arial, sans-serif;
  color: #23a1bd;
  font-weight: 1000;
  font-size: 40px;
  line-height: 46px;
  letter-spacing: -0.75px;
  margin-bottom: 10px;
`;

export const InputLabel = styled.label`
  width: 100%;
  position: relative;
`;

export const Tag = styled.div`
  padding-top: 30px;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 9px;
  padding-left: 3px;
  margin-left: 10%;
`;

export const InputBox = styled.input`
  border-radius: 2px;
  padding-left: 7px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 3px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin: 0 0 20px;
  color: #b4b4b4;
  font-size: 22px;
  height: 50px;
  width: 80%;
  margin-left: 10%;
`;

export const ArrowButton = styled.button`
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
  top: 72px;
  width: 30px;
  height: 32px;
  right: 11%;
  color: #61dafb;
  cursor: pointer;
`;
