import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";

export const variants = {
  rollDown: {
    rotate: 180,
    backgroundColor: "rgb(200,200,200,0.33)",
    borderRadius: "7px",
  },
  rollUp: {},
};

export const HashTagContainer = styled.div`
  display: flex;
  column-gap: 0.2em;
  row-gap: 0.5em;
  font-size: 0.7em;
  align-items: center;
  flex-wrap: wrap;
`;

export const ArrowImg = styled(motion.img)`
  height: 1.2em;
  width: 2.2em;
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
  font-size: 0.7em;
  justify-content: space-around;
`;

export const TopContext = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 0.95em;
`;
export const MiddleContext = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-items: flex-end;
`;
export const BottomContext = styled.div`
  justify-content: space-between;
  display: flex;
  color: #808080;
`;

export const PromiseImg = styled.img`
  display: block;
  width: 75px;
  height: 75px;
  background-color: var(--basic-color);
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
  padding-top: 5px;
  align-items: flex-end;
`;

export const PlanTail = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 5px;
  align-items: flex-end;
  & span {
    font-size: 0.75em;
  }
  & div {
    display: flex;
    align-items: center;
  }
`;

export const PBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: center;
  min-width: 280px;
  min-height: 50px;
  padding: 5px;
  border: rgba(0, 0, 0, 20%) solid 0.3px;
  border-radius: 10px;
  user-select: none;
`;

export const UnreadChatSpan = styled.span`
  background-color: rgb(255,97,74);  
  border-radius: 25px;
  font-size: small;
  padding: 1px 3px;
  min-width: 12px;
  height: 15px;
  text-align: center;
  text-justify: inter-word;
  color: white;
`;