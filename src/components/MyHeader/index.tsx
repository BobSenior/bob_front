import { Component, FC } from "react";

interface Props{
    headText : String;
    left : any;
    right : any;
}

const MyHeader: FC<Props> = ({headText,left,right}) =>{


    return (
        <header>
            <div className = 'head_left_bt'>
                {left}
            </div>
            <div className='head'>
                {headText}
            </div>
            <div className='head_right_bt'>
                {right}
            </div>
        </header>
    )
}

export default MyHeader;