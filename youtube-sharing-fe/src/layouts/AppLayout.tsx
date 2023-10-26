import React, { useEffect } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderComponent from "~/components/Header";
import { scrollToTop } from "~/utils";

const { Header, Footer, Content } = Layout;

const AppLayout = () => {
  const d = new Date();
  const year = d.getFullYear();
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, [navigate]);

  return (
    <Container>
      <MainLayout>
        <HeaderStyled>
          <HeaderContent>
            <HeaderComponent />
          </HeaderContent>
        </HeaderStyled>
        <ContentStyled>
          <Outlet />
        </ContentStyled>
      </MainLayout>
      <LayoutFooter>
        <MainLayout>{`Ⓒ Copyright ${year}`}</MainLayout>
      </LayoutFooter>
    </Container>
  );
};

export default AppLayout;

const Container = styled(Layout)`
  min-height: 100dvh;
  overflow-x: hidden;
`;

const MainLayout = styled(Layout)`
  margin: auto;
  max-width: ${(props) => props.theme.constant.width.maxWidth};
  width: 100%;
  background-color: transparent;

  @media (max-width: ${(props) => props.theme.breakpoint.xxl}) {
    padding: 0px 20px;
  }
`;

const HeaderStyled = styled(Layout)`
  padding: 0px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #f5f5f5;
  width: 100%;
  height: ${(props) => props.theme.constant.height.header};
`;

const HeaderContent = styled(Header)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  max-width: ${(props) => props.theme.constant.width.maxWidth};
  background-color: transparent;
  margin: auto;
  padding: 0px;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoint.xxl}) {
    padding: 0px 20px;
  }
`;

const ContentStyled = styled(Content)`
  margin-top: ${(props) => props.theme.constant.height.header};
  padding-top: 20px;
  padding-bottom: 20px;
`;

const LayoutFooter = styled(Footer)`
  height: ${(props) => props.theme.constant.height.bottom};
  background-color: black;
  color: white;
  padding: 0px;
  display: flex;
  align-items: center;
`;
