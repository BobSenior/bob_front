import { Button, Input } from "./style";
import { FormEvent, useCallback, useState } from "react";

const SearchBox = () => {
  const [input, setInput] = useState("");
  const onSubmitSearch = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <form rel={"search"}>
      <Input placeholder={"검색"} autoFocus={true} />
    </form>
  );
};
export default SearchBox;
