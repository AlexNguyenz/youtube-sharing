import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ROUTES } from "~/constant/route";
import authState, { IAuth } from "~/stores/user";

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { accessToken, email } = useRecoilValue<IAuth>(authState);
  if (!accessToken || !email) {
    return <Navigate to={ROUTES.HOME} />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
