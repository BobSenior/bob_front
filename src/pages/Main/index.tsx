import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PageSpinnerWrapper, PromisesColumn, PromisesWrapper } from "./style";
import PostBox from "../../components/PostBox";
import { AppointmentHeadDTO } from "../../types/db";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import countColumns from "../../utils/countColumns";
import { Oval } from "react-loader-spinner";
import useSWRInfinite from "swr/infinite";
import { infiniteFetcher } from "../../utils/fetchers";

export const testUserIdx = 1;

const Main = () => {
  const [numOfColumns, setNumOfColumns] = useState<number>(
    countColumns({ totalWidth: window.innerWidth })
  );
  const [isReachingEnd, setReachingEnd] = useState<boolean>(false);

  const {
    data: PostHeads,
    isValidating,
    mutate,
    size,
    setSize,
  } = useSWRInfinite<AppointmentHeadDTO[]>(
    (pageIndex: number, previousPageData: AppointmentHeadDTO[][]) => {
      if (
        (previousPageData && previousPageData.length < 10) ||
        !isReachingEnd
      ) {
        setReachingEnd(true);
        return null;
      }
      return `/post/list?page=${pageIndex}&size=10&userIdx=${testUserIdx}`;
    },
    infiniteFetcher,
    { revalidateOnMount: true, revalidateOnFocus: false }
  );

  const columnDivs = useMemo(() => {
    const tempColDivs = new Array(numOfColumns);
    for (let i = 0; i < numOfColumns; i++) tempColDivs[i] = [];
    PostHeads?.flat().forEach((value, index) => {
      tempColDivs[index % numOfColumns].push(
        <PostBox data={value} key={generateUniqueID()} />
      );
    });
    return tempColDivs;
  }, [numOfColumns, PostHeads]);

  const getNextPage = useCallback(() => {
    let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
    let windowHeight = window.innerHeight; // 스크린 창
    let fullHeight = document.body.scrollHeight; //  margin 값은 포함 x

    if (scrollLocation + windowHeight >= fullHeight - 5 && !isReachingEnd) {
      setSize(size + 1)
        .then(() => console.log("다음 페이지"))
        .catch((error) => console.log(error));
    }
  }, [size, setSize]);

  const recountColumns = useCallback(() => {
    setNumOfColumns(countColumns({ totalWidth: window.innerWidth }));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", getNextPage);
    window.addEventListener("resize", recountColumns);
    return () => {
      window.removeEventListener("scroll", getNextPage);
      window.removeEventListener("resize", recountColumns);
    };
  }, []);

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
      <PageSpinnerWrapper>
        {isValidating || !isReachingEnd ? (
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
        ) : (
          isReachingEnd && (
            <span className={"end-point"}>더 이상 약속이 없어요.</span>
          )
        )}
      </PageSpinnerWrapper>
    </>
  );
};

export default Main;
