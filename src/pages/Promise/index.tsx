import { useParams } from "react-router-dom";

const Promise = () => {
  const { id } = useParams();

  return <div>123{id}</div>;
};

export default Promise;
