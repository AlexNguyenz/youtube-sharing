import ThemeProvider from "./theme";
import { RecoilRoot } from "recoil";
import MainRoutes from "./routes";
import Toast from "./components/Toast";

function App() {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <MainRoutes />
        <Toast />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
