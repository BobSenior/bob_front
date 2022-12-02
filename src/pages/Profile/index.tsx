import React from "react";
import { useParams } from "react-router-dom";
import { testUserIdx } from "../Main";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { userIdx } = useParams();

  if (!!userIdx && userIdx === testUserIdx.toString())
    return <Navigate to="me" replace={true} />;

  return <div>{(userIdx ?? "나") + "의 프로필"}</div>;
};
export default Profile;
