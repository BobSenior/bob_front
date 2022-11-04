import { useParams } from "react-router-dom";

const Search = () => {
  const { input } = useParams();

  return <div>{input}</div>;
};

export default Search;
