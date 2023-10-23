import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ThemeProvider from "./theme";
import AppLayout from "./layouts/AppLayout";
import SharePage from "./pages/SharePage";
import NotFound from "./pages/NotFound";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="share" element={<SharePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
