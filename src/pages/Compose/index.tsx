import { Navigate, useParams } from "react-router-dom";

const Compose = () => {
  const { id } = useParams();

  if (!id) {
    console.log("error");
    return <Navigate to={"/1"} />;
  } else {
    console.log(id);
  }
  return <div></div>;
};
export default Compose;
