import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ROUTES } from "~/constant/route";
import authState, { IAuth } from "~/stores/user";
import { clearStorage } from "~/utils/storage";
import Notification from "./Notification";
import loadingState from "~/stores/loading";

const UserInfo = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState<IAuth>(authState);
  const setLoading = useSetRecoilState(loadingState);

  const handleLogout = () => {
    clearStorage();
    setAuth({ email: "", accessToken: "" });
    navigate(ROUTES.HOME, { replace: true });
    setLoading(true);
  };
  const handleNavigateSharingPage = () => {
    navigate(ROUTES.SHARE);
  };
  return (
    <React.Fragment>
      <p data-cy="email">{auth.email}</p>
      <Notification />
      <Button
        data-cy="share-movie"
        type="primary"
        onClick={handleNavigateSharingPage}
      >
        Share a movie
      </Button>
      <Button data-cy="logout" onClick={handleLogout}>
        Logout
      </Button>
    </React.Fragment>
  );
};

export default UserInfo;
