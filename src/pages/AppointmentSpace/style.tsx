
import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";
import TextAreaAutosize from "react-textarea-autosize";



export const Top = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-around;
  top:40px;
  bottom: 0;
  width: 80%;
  left:10%;
  height: 60px;
  z-index: 100;
  background-color: white;
  & div {
    width: 100%;
  }
`;

export const TitleWrapper = styled.label`
    width: 80%;
  margin-bottom: 10px;
`;

export const Title = styled.label`
  text-align: left;
  font-size: 25px;
  font-weight:bold;
  padding-top: 100px;
  & span {
    font-size: 0.9em;
    color: rgba(255, 0, 0, 0.7);
  }
`;

export const LocationWrapper = styled.label`
  background-color: #b4b4b4;
  border-radius: 15px;
  flex-direction: row;
  width: 100%;
  height:100px;
  display: flex;
`;

export const VoteSequence = styled.label`
  text-align: center;
  font-size: 22px;
  color: gray;
  font-weight:bold;
  padding-top: 10px;
  padding-bottom: 10px;
  & span {
    font-size: 0.9em;
    color: rgba(255, 0, 0, 0.7);
  }
`;

export const BoxSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  left:10%;
  border : 5px solid black;
  border-radius: 15px;
`;

export const Commit = styled(motion.button)`
  height: 40px;
  width:100px;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  font: large bold;
  background-color: #23a1bd;
  color: white;
  border-color: #23a1bd;
  border-radius: 15px;
  font-weight: bold;
`;

export const NoOneSpanVote = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: grey;
  margin-bottom: 20px;
`;

export const TLSection = styled.section`
  & h1 {
    border-bottom: rgb(200, 200, 200) ridge 1px;
    font-size: 0.8em;
    height: 100px;
  }
  width: 80%;
  height:60px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  margin: 7px 0;
`;

export const MyPlaceInfoDiv = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left:15%;
  padding-right: 100px;
  background-color: rgba(255, 255, 255, 30%);
  border-radius: 7px;
  cursor: pointer;
  width: 25%;
`;

export const MyTimeInfoDiv = styled.div`
  align-items: center;
  padding-top:20px;
  text-align: center;
  width:60%;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 30%);
  border-radius: 7px;
`;