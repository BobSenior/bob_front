import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  PageSpinnerWrapper,
  PromisesColumn,
  PromisesWrapper,
  SearchInputDiv,
} from "./style";
import PostBox from "../../components/PostBox";
import { AppointmentHeadDTO, MyDataDTO } from "../../types/db";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import countColumns from "../../utils/countColumns";
import { Oval } from "react-loader-spinner";
import useSWRInfinite from "swr/infinite";
import { infiniteFetcher } from "../../utils/fetchers";
import { Navigate, useParams } from "react-router-dom";
import GlobalContext from "../../hooks/GlobalContext";

const pageSize = 10;

const Main = () => {
  const { searchInput } = useParams();
  const [numOfColumns, setNumOfColumns] = useState<number>(
    countColumns({ totalWidth: window.innerWidth })
  );
  let myData: MyDataDTO | null = null;
  try {
    myData = JSON.parse(sessionStorage.getItem("myData") ?? "");
  } catch (error) {
    console.log(error);
    return <Navigate to={"login"} />;
  }

  const {
    data: PostHeads,
    isValidating,
    setSize,
    error,
  } = useSWRInfinite<AppointmentHeadDTO[]>(
    (pageIndex: number) => {
      return searchInput
        ? `/post/search?page=${pageIndex}&size=${pageSize}&userIdx=${myData?.userIdx}&searchString=${searchInput}`
        : `/post/list?page=${pageIndex}&size=${pageSize}&userIdx=12`;
    },
    infiniteFetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      dedupingInterval: 2000,
      revalidateFirstPage: false,
    }
  );

  const isEmpty = PostHeads?.[0].length === 0;
  const isReachingEnd =
    isEmpty ||
    (PostHeads && PostHeads[PostHeads.length - 1]?.length < pageSize) ||
    false;

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
    let scrollLocation = document.documentElement.scrollTop; // ?????? ???????????? ??????
    let windowHeight = window.innerHeight; // ????????? ???
    let fullHeight = document.body.scrollHeight; //  margin ?????? ?????? x

    if (scrollLocation + windowHeight >= fullHeight && !isReachingEnd) {
      setSize((size) => size + 1)
        .then(() => {})
        .catch((error) => console.log(error));
    }
  }, [isReachingEnd, setSize]);

  const recountColumns = useCallback(() => {
    setNumOfColumns(countColumns({ totalWidth: window.innerWidth }));
  }, []);

  const endSpan = useMemo(() => {
    let str = "";
    if (isEmpty) {
      str = "????????? ?????????.";
    } else {
      if (isValidating && !isReachingEnd)
        return (
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
        );
      else if (isReachingEnd) str = "????????? ???????????????.";
    }
    return <span className={"end-point"}>{str}</span>;
  }, [isReachingEnd, isEmpty, isValidating, PostHeads]);

  useEffect(() => {
    window.addEventListener("scroll", getNextPage);
    window.addEventListener("resize", recountColumns);
    return () => {
      window.removeEventListener("scroll", getNextPage);
      window.removeEventListener("resize", recountColumns);
    };
  }, []);

  if (error) return <div>404 error</div>;

  return (
    <div>
      {searchInput && <SearchInputDiv>{searchInput}??? ????????????</SearchInputDiv>}
      <PromisesWrapper
        style={{ gridTemplateColumns: `repeat(${numOfColumns}, 1fr)` }}
      >
        {columnDivs.map((value) => {
          return (
            <PromisesColumn key={generateUniqueID()}>{value}</PromisesColumn>
          );
        })}
      </PromisesWrapper>
      <PageSpinnerWrapper>{endSpan}</PageSpinnerWrapper>
    </div>
  );
};

export default Main;
