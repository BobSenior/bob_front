import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { PromisesColumn, PromisesWrapper } from "./style";
import PromiseBox from "../../components/PostBox";
import { AppointmentHeadDTO, BaseResponse } from "../../types/db";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import countColumns from "../../utils/countColumns";
import { Oval } from "react-loader-spinner";
import useSWRInfinite from "swr/infinite";
import { getFetcher } from "../../utils/fetchers";

const Main = () => {
  const [numOfColumns, setNumOfColumns] = useState<number>(1);
  const [isReachingEnd, setReachingEnd] = useState(true);
  const {
    data: PostHeads,
    error,
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite<BaseResponse<AppointmentHeadDTO[]>>(() => {
    return "123";
  }, getFetcher);

  const columnDivs = useMemo(() => {
    const tempColDivs = new Array(numOfColumns);
    for (let i = 0; i < numOfColumns; i++) tempColDivs[i] = [];
    // PostHeads?.result.forEach((value, index) => {
    //   tempColDivs[index % numOfColumns].push(
    //     <PromiseBox data={value} key={generateUniqueID()} />
    //   );
    // }
    // );

    return tempColDivs;
  }, [numOfColumns, PostHeads]);

  const recountColumns = useCallback(() => {
    const num = countColumns({ totalWidth: window.innerWidth });
    setNumOfColumns(num);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", recountColumns);
    recountColumns();
    return () => {
      window.removeEventListener("resize", recountColumns);
    };
  }, [window.innerWidth]);

  return (
    <>
      <PromisesWrapper
        style={{ gridTemplateColumns: `repeat(${numOfColumns}, 1fr)` }}
      >
        {columnDivs.map((value) => {
          return (
            <PromisesColumn key={generateUniqueID()}>{value}</PromisesColumn>
          );
        })}
      </PromisesWrapper>
      <div
        style={{
          minHeight: "7vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        {isReachingEnd ? (
          <span style={{ fontSize: "0.85em", color: "gray" }}>
            더 이상 약속이 없어요.
          </span>
        ) : (
          <Oval
            height={"5vh"}
            width={"5vh"}
            color={"var(--basic-color)"}
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor={"#828282"}
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
      </div>
    </>
  );
};

export default memo(Main);
