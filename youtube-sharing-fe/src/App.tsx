import ThemeProvider from "./theme";
import { RecoilRoot } from "recoil";
import MainRoutes from "./routes";

function App() {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <MainRoutes />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
