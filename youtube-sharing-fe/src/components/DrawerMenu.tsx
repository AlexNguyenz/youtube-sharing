import React from "react";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/constant/route";
import { useSetRecoilState } from "recoil";
import authState, { IAuth } from "~/stores/user";

interface Props {
  onClose: () => void;
}

const DrawerMenu: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState<IAuth>(authState);
  const handleNavigateSharePage = () => {
    navigate(ROUTES.SHARE);
    onClose();
  };
  const handleLogout = () => {
    navigate(ROUTES.HOME, { replace: true });
    setAuth({ email: "", accessToken: "" });
    localStorage.clear();
    onClose();
  };
  return (
    <Flex vertical gap={"10px"}>
      <Button type="primary" onClick={handleNavigateSharePage}>
        Share video
      </Button>
      <Button onClick={handleLogout}>Logout</Button>
    </Flex>
  );
};

export default DrawerMenu;
