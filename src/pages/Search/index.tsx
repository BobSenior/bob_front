import { useParams } from "react-router-dom";

const Search = () => {
  const { result } = useParams();

  return <div>{result}</div>;
};

export default Search;
