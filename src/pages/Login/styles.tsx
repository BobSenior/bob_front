import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";

export const Header = styled.header`
  margin-top: 15vh;
  margin-bottom: 20px;
  & a {
    font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma,
    Arial, sans-serif;
    color: var(--basic-color);
    font-weight: 1000;
    text-decoration: none;
    font-size: 3em;
  }
`;

export const Form = styled.form`
  width: 80vw;
  max-width: 500px;
`;

export const Input = styled.input`
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin: 0 0 20px;
  width: 100%;
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 11px 12px 13px 11px;
  font-size: 18px;
  line-height: 1.33333333;
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export const Finding_string = styled.div`
  text-align: end;
  font-size: 18px;
  padding-bottom: 8px;
  &:hover {
    color: var(--basic-color);
    cursor: pointer;
  }
`;

export const BottomButton = styled(motion.button)`
  width: 100%;
  color: #fff;
  background-color: var(--basic-color);
  height: 5vh;
  max-height: 80px;
  min-height: 50px;
  border: 0;
  outline: 0;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
`;

export const ArrowBotton = styled.button`
  position: absolute;
  left: 0;
  right: 0;
  content: "";
  width: 50px;
  height: 50px;
  border-top: 5px solid #000;
  border-right: 5px solid #000;
  transform: rotate(225deg);
`;

export const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;

  & span {
    color: #afafaf;
    font-size: 0.8em;
    padding: 3px 5px;
  }
  & img {
    cursor: pointer;
  }
`;

export const LinkContainer = styled.p`
  text-align: end;
  max-width: 500px;
  width: 100vw;
  font-size: 18px;
  color: #9b9b9b;
  margin-right: 20px;
  margin-top: 5px;

  & a {
    position: relative;
    top: 0;
    color: #34a9ab;
    text-decoration: none;
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FormSection = styled.section`
  position: relative;
  background-color: var(--basic-back-color);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

export const LoginPageWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
