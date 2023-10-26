import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { DefaultValue, RecoilRoot, RecoilState } from "recoil";
import { ThemeProvider } from "styled-components";
import theme from "~/theme/theme";

type InitStateRecoil<T> = {
  recoilState: RecoilState<T>;
  initValue: T | DefaultValue | ((prevValue: T) => T | DefaultValue);
};

export const WrapperWithInitState = <T,>({
  children,
  recoilState,
  initValue,
}: PropsWithChildren<InitStateRecoil<T>>) => {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot
        initializeState={({ set }) => {
          set(recoilState, initValue);
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <BrowserRouter>{children}</BrowserRouter>
      </RecoilRoot>
    </ThemeProvider>
  );
};
