import styled from "@emotion/styled";

export const Header = styled.header`
  font-family: 'Roboto';
  text-align: center;
  position: absolute;
  width: 941px;
  height: 11px;
  left: 296px;
  top: 10px;
  font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma, Arial, sans-serif;
  font-weight: 700;
  font-size: 40px;
  line-height: 46px;
  letter-spacing: -0.75px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const Form = styled.form`
  position:relative;
  top:180px;
  margin: 0 auto;
  width: 1000px;
  max-width: 1000px;
`;

export const Input = styled.input`
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin: 0 0 20px;
  position: relative;
  left: 90px;
  width: 80%;
  height: 55px;
  color: #b4b4b4;
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 18px;
  line-height: 1.33333333;
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export const Finding_string = styled.div`
  position: relative;
  font-size: 18px; 
  left: 73%;
`;

export const BottomButton = styled.button`
 position: relative;
 top: 320px;
 width: 750%;
 max-width: 60%;
 color: #fff;
 background-color: #34A9AB;
 height: 80px;
 min-width: 100px;
 border: 0;
 outline: 0;
 border-radius: 10px;
 font-size: 20px;
 left : 20%;
 margin: auto;
`;

export const ArrowBotton = styled.button`
  position: absolute;
  left: 0;
  right: 0;
  content: '';
  width: 50px;
  height: 50px;
  border-top: 5px solid #000;
  border-right: 5px solid #000;
  transform: rotate(225deg);
`;

export const LinkContainer = styled.p`
  position: relative;
  top:245px;
  font-size: 18px;
  color: #616061;
  margin: 0 auto 8px;
  left: 15px;
  width: 300px;
  max-width: 4500px;
  & a {
    position: relative;
    top:0px;
    color: 
    #34A9AB
    ;
    text-decoration: none;
    font-weight: 700;
    &:hover {
      text-decoration: underline;
    }
  }
`;
