import React,{FC} from "react";

interface Props {
    contents : String;
    onClick : ()=>void;
  }


const MyButton: FC<Props> = ({contents,onClick}) =>{
    return(
        <button onClick={onClick}>{contents}</button>
    );
};


export default MyButton;