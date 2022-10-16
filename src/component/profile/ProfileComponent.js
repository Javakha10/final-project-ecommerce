import { CircularProgress } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { useAxios } from "../../app/hooks/useAxios";

const ProfileComponent = () => {
  const { state } = useLocation();
  const { isLoading, data, error } = useAxios(`/users/${state?.id}`);
  return (
    <div>
      {isLoading && <CircularProgress>loading</CircularProgress>}
      {data && (
        <>
          <h1>{data.user?.firstName}</h1>
          <h1>{data.user?.lastName}</h1>
        </>
      )}
    </div>
  );
};

export default ProfileComponent;
