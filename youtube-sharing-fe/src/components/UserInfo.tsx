import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ROUTES } from "~/constant/route";
import authState, { IAuth } from "~/stores/user";
import { clearStorage } from "~/utils/storage";

const UserInfo = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState<IAuth>(authState);

  const handleLogout = () => {
    clearStorage();
    setAuth({ email: "", accessToken: "" });
    navigate(ROUTES.HOME, { replace: true });
  };
  const handleNavigateSharingPage = () => {
    navigate(ROUTES.SHARE);
  };
  return (
    <React.Fragment>
      <p>{auth.email}</p>
      <Button type="primary" onClick={handleNavigateSharingPage}>
        Share a movie
      </Button>
      <Button onClick={handleLogout}>Logout</Button>
    </React.Fragment>
  );
};

export default UserInfo;
