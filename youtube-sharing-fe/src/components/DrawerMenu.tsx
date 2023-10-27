import React from "react";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/constant/route";
import { useSetRecoilState } from "recoil";
import authState, { IAuth } from "~/stores/user";
import { clearStorage } from "~/utils/storage";
import loadingState from "~/stores/loading";

interface Props {
  onClose: () => void;
}

const DrawerMenu: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState<IAuth>(authState);
  const setLoading = useSetRecoilState(loadingState);

  const handleNavigateSharePage = () => {
    navigate(ROUTES.SHARE);
    onClose();
  };
  const handleLogout = () => {
    navigate(ROUTES.HOME, { replace: true });
    setAuth({ email: "", accessToken: "" });
    setLoading(true);
    clearStorage();
    onClose();
  };
  return (
    <Flex vertical gap={"10px"}>
      <Button
        data-cy="share-movie"
        type="primary"
        onClick={handleNavigateSharePage}
      >
        Share a movie
      </Button>
      <Button data-cy="logout" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
};

export default DrawerMenu;
