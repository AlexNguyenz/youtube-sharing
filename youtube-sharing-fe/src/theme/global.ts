import { createGlobalStyle } from "styled-components";
import normalize from "normalize.css";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  body {
    font-family: sans-serif;
  }
  p {
    margin: 0px;
  }
`;
