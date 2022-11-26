import { useParams } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PromiseBox from "../../components/PostBox";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { PromisesColumn, PromisesWrapper } from "../Main/style";
import { AppointmentHeadDTO, promiseInfo } from "../../types/db";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import {infiniteFetcher} from "../../utils/fetchers";
import {testUserIdx} from "../Main";
import PostBox from "../../components/PostBox";
import countColumns from "../../utils/countColumns";


const Search = () => {
  const { input } = useParams();
  const [numOfColumns, setNumOfColumns] = useState<number>(1);
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
        return `/post/search?page=${pageIndex}&size=10&userIdx=${testUserIdx}&searchString=${input}`;
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



  useEffect(() => {
    window.addEventListener("resize", recountColumns);
    recountColumns();
    return () => {
      window.removeEventListener("resize", recountColumns);
    };
  }, [window.innerWidth]);

  return (
    <PromisesWrapper>
      {input}
      {columnDivs.map((value) => {
        return (
          <PromisesColumn key={generateUniqueID()}>{value}</PromisesColumn>
        );
      })}
    </PromisesWrapper>
  );
};

export default Search;
