import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";
import TextAreaAutosize from "react-textarea-autosize";

export const Top = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-around;
  top: 40px;
  bottom: 0;
  width: 80%;
  left: 10%;
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
  font-weight: bold;
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
  height: 100px;
  display: flex;
`;

export const VoteSequence = styled.label`
  text-align: center;
  font-size: 22px;
  color: gray;
  font-weight: bold;
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
  left: 10%;
  border: 2px solid black;
  border-radius: 15px;
  margin-bottom: 50px;
`;

export const Commit = styled(motion.button)`
  height: 40px;
  min-width: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  font: large bold;
  background-color: #23a1bd;
  color: white;
  border-color: #23a1bd;
  border-radius: 15px;
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
  height: 60px;
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
  padding-left: 15%;
  padding-right: 100px;
  background-color: rgba(255, 255, 255, 30%);
  border-radius: 7px;
  cursor: pointer;
  width: 25%;
`;

export const MyTimeInfoDiv = styled.div`
  align-items: center;
  padding-top: 20px;
  text-align: center;
  width: 60%;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 30%);
  border-radius: 7px;
`;

export const InviteBuyerButton = styled.button`
  background-color: white;
  width: 100px;
  border: 3px solid gray;
  font-weight: bold;
  border-radius: 10px;
  color: gray;
  font-size: 15px;
  cursor: pointer;
`;

export const MemberSection = styled.section`
  & h1 {
    border-bottom: rgb(200, 200, 200) ridge 1px;
    font-size: 0.8em;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  margin: 7px 0;
  padding-bottom: 30px;
`;
export const LargeMembersDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  row-gap: 8px;
  column-gap: 3px;
`;

export const LargeMembersColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
  & h4 {
    margin: 3px 0;
  }
`;

export const BottomButtonSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const BottomButton = styled.button`
  background-color: #23a1bd;
  border-radius: 10px;
  font-weight: bold;
  font-size: 23px;
  color: white;
  border-color: #23a1bd;
  height: 50px;
  width: 40%;
  margin-left: 5%;
  margin-right: 5%;
  cursor: pointer;
`;

export const MakeVoteButton = styled.button`
  background-color: white;
  border-color: gray;
  font-size: 22px;
  margin-bottom: 20px;
  margin-top: 5px;
  width: 80%;
  height: 50px;
  color: gray;
  font-weight: bold;
  border-radius: 20px;
  border-color: gray;
  cursor: pointer;
  outline: 0;
  border: 0;
`;

export const UserButtonWrapper = styled.label`
  display: flex;
  flex-direction: row;
`;

export const KickButton = styled.button`
  background-color: red;

  width: 20px;
  height: 20px;
  border-radius: 8px;
  margin-left: 5px;
`;

export const AddButton = styled.button`
  background-color: #23a1bd;
  border-radius: 5px;
  margin-left: 3px;
  font-weight: bold;
  color: white;
  border-color: #23a1bd;
`;

export const VoteRecordSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const VoteSection = styled.section`
  width: 90%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  background-color: navajowhite;
  border-radius: 5px;
`;

export const PlusButton = styled.button`
  border-radius: 100px;
  margin-top: 10px;
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
  margin-left: 10px;
  border-color: gray;
  font-size: 22px;
  font-weight: bold;
`;

export const RecordLabel = styled.label`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  margin-bottom: 8px;
  width: 100%;
`;

export const RecordInputBox = styled.input`
  margin-left: 10px;
  min-width: 60px;
  height: 30px;
  border: gray solid 1px;
  border-radius: 3px;
`;

export const FixLabel = styled.label`
  display: flex;
  width: 100%;
  padding-left: 8px;
  margin-bottom: 5px;
`;

export const PlaceButton = styled.button`
  margin-left: 5%;
  margin-right: 5%;
  width: 40%;
  height: 30px;
  border-radius: 15px;
`;

export const RemainsButton = styled.button`
  width: 40%;
  border-radius: 15px;
  margin-left: 5%;
  margin-right: 5%;
`;

export const SpaceInput = styled.label`
  width: 10000px;
  height: 150px;
  font-weight: bold;
  font-size: 22px;
  background-color: navajowhite;
  padding-bottom: 5px;
  padding-top: 5px;
`;

export const LAMButtonVote = styled(motion.div)`
  border-radius: 3px;
  margin-left: 8%;
  margin-top: 15px;
  margin-bottom: 20px;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  cursor: pointer;
  border: 0.5px solid #000000;
  padding: 3px;
`;
export const ResultSpanVote = styled.span`
  font-size: 0.95em;
  display: table-cell;
  text-align: center;
  text-align: -moz-center;
  text-align: -webkit-center;
  vertical-align: middle;
  margin-top: 2px;
`;

export const PrevButton = styled.button`
  width: 50%;
  border-radius: 11px;
  background-color: ghostwhite;
  font-size: 15px;
  font-weight: bold;
  height: 33px;
  margin-top: 8px;
  cursor: pointer;
  margin-bottom: 8px;
`;
