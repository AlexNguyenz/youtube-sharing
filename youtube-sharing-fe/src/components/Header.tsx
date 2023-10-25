import React from "react";
import { HomeFilled } from "@ant-design/icons";
import { Col, Flex, Grid, Row } from "antd";
import styled from "styled-components";
import Form from "./Form";
import Drawer from "./Drawer";
import UserInfo from "./UserInfo";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/constant/route";
import { scrollToTop } from "~/utils";
import { useRecoilValue } from "recoil";
import authState, { IAuth } from "~/stores/user";

const { useBreakpoint } = Grid;

const HeaderComponent = () => {
  const screens = useBreakpoint();
  const isTablet = screens.sm && screens.md;
  const isMobile = screens.xs;
  const navigate = useNavigate();
  const { email, accessToken } = useRecoilValue<IAuth>(authState);
  const isLogged = email && accessToken;

  const handleNavigateHomePage = () => {
    navigate(ROUTES.HOME);
    scrollToTop();
  };

  return (
    <RowStyled>
      <Col span={12} xs={24} md={12}>
        <Flex
          style={{ height: "100%" }}
          align="center"
          justify={isMobile || isTablet ? "flex-start" : "center"}
        >
          <HomeFilled
            style={{ fontSize: isMobile ? "20px" : "30px", cursor: "pointer" }}
            onClick={handleNavigateHomePage}
          />
          <Title onClick={handleNavigateHomePage}>Funny Movies</Title>
        </Flex>
      </Col>
      <Col span={12} xs={0} md={12}>
        <Flex
          style={{ height: "100%" }}
          align="center"
          gap="10px"
          justify="flex-end"
        >
          {isLogged ? <UserInfo /> : <Form />}
        </Flex>
      </Col>
      <DrawerWrapper>
        <Drawer />
      </DrawerWrapper>
    </RowStyled>
  );
};

export default HeaderComponent;

const RowStyled = styled(Row)`
  height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoint.md}) {
    position: relative;
  }
`;

const Title = styled.p`
  font-size: 32px;
  font-weight: bold;
  padding-left: 20px;
  line-height: 32px;
  transition: all 0.2s ease;
  cursor: pointer;

  @media (max-width: ${(props) => props.theme.breakpoint.md}) {
    font-size: 24px;
    padding-left: 10px;
  }

  @media (max-width: ${(props) => props.theme.breakpoint.xs}) {
    font-size: 20px;
  }
`;

const DrawerWrapper = styled(Row)`
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoint.md}) {
    display: block;
    position: absolute;
    right: 0px;
  }
`;
