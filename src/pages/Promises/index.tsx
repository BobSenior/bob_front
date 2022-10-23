import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { PromisesColumn, PromisesWrapper } from "./style";
import PromiseBox from "../../components/PromiseBox";
import { promiseInfo } from "../../types/db";

const p2: promiseInfo[] = [
  {
    name: "라이언",
    ID: "22",
    title: "밥먹을 사람!",
    major: "미디어커뮤니테이션학부",
    place: "흑석동",
    time: "10월 30일",
  },
  {
    name: "라이언",
    ID: "22",
    title: "밥먹을 사람!",
    major: "에너지시스템공학부",
    place: "흑석동",
    time: "10월 30일",
  },
  {
    name: "어피치",
    ID: "21",
    title: "밥먹을 사람12!",
    major: "생명자원공학부",
    place: "상도동",
    time: "10월 29일",
  },
  {
    name: "야다",
    ID: "21",
    title: "아무나1",
    major: "물리학과",
    place: "상도동",
    time: "10월 29일",
  },
];

const Promises = () => {
  const [numOfColumns, setNumOfColumns] = useState(3);
  const [loading, setLoading] = useState(false);

  const recountColumns = () => {
    let column = Math.floor(window.innerWidth / 320);
    // console.log(column);
    setNumOfColumns(column > 3 ? 3 : column);
  };

  const columnDivs = useMemo(() => {
    const tempColDivs = new Array(numOfColumns).fill((children: ReactNode) => {
      return <PromisesColumn>{children}123</PromisesColumn>;
    });
    //TODO: 동적 레이아웃을 위해 column 수에 따라 조정

    return tempColDivs;
  }, [numOfColumns]);

  useEffect(() => {
    window.addEventListener("resize", recountColumns);
    return () => {
      window.removeEventListener("resize", recountColumns);
    };
  }, [window]);

  return (
    <PromisesWrapper>
      <PromisesColumn>
        {p2.map((value, index) => {
          return <PromiseBox key={index.toString()} data={value} />;
        })}
      </PromisesColumn>
    </PromisesWrapper>
  );
};

export default Promises;

// <div>
//   <label>로딩 체크</label>
//   <input
//     className="form-check-input"
//     type="checkbox"
//     id={`loadingCheckbox`}
//     checked={loading}
//     onChange={() => {
//       setLoading((b) => !b);
//     }}
//   />
// </div>
