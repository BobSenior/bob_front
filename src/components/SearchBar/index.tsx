import { Input, ResultSpan, SearchWrapper } from "./style";
import React, { FormEvent, memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

const SearchBox = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(true);

  const onSubmitSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      navigate(`search/${validator.escape(input)}`);
      setShowInput(false);
    },
    [input]
  );

  return (
    <SearchWrapper>
      {showInput ? (
        <form rel={"search"} onSubmit={onSubmitSearch}>
          <label id={"search-label"}>
            <Input
              initial={{ scaleX: 0.1 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0.1 }}
              placeholder={"검색"}
              value={input}
              autoFocus={true}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </label>
        </form>
      ) : (
        <ResultSpan
          onClick={(e) => {
            e.stopPropagation();
            setShowInput(true);
          }}
        >
          {input}
        </ResultSpan>
      )}
    </SearchWrapper>
  );
};
export default memo(SearchBox);
