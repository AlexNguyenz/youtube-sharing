import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/constant/route";
import { useSetRecoilState } from "recoil";
import loadingState from "~/stores/loading";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingState);

  const handleGoHome = () => {
    navigate(ROUTES.HOME, { replace: true });
    setLoading(true);
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleGoHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
