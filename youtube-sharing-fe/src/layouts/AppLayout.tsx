import React, { PropsWithChildren } from "react";
import { Layout } from "antd";
import styled from "styled-components";

const { Header, Footer, Content } = Layout;

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <MainLayout>
        <HeaderStyled>
          <HeaderContent>HeaderStyled</HeaderContent>
        </HeaderStyled>
        <ContentStyled>{children}</ContentStyled>
      </MainLayout>
      <LayoutFooter>
        <MainLayout>Footer</MainLayout>
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
  width: ${(props) => props.theme.constant.width.maxWidth};
  background-color: transparent;
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
  width: ${(props) => props.theme.constant.width.maxWidth};
  background-color: transparent;
  margin: auto;
  padding: 0px;
`;

const ContentStyled = styled(Content)`
  height: 2000px;
  padding-top: ${(props) => props.theme.constant.height.header};
`;

const LayoutFooter = styled(Footer)`
  height: ${(props) => props.theme.constant.height.bottom};
  background-color: black;
  color: white;
  padding: 0px;
  display: flex;
  align-items: center;
`;
