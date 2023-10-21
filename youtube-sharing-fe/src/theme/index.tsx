import React, { PropsWithChildren } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";

import theme from "./theme";
import { GlobalStyle } from "./global";

const ThemeProvider = ({ children }: PropsWithChildren) => (
  <StyledProvider theme={theme}>
    {children}
    <GlobalStyle />
  </StyledProvider>
);

export default ThemeProvider;
