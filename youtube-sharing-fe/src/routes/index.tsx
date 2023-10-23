import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "~/layouts/AppLayout";
import HomePage from "~/pages/HomePage";
import PrivateRoute from "./PrivateRoute";
import SharePage from "~/pages/SharePage";
import NotFound from "~/pages/NotFound";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="share"
            element={
              <PrivateRoute>
                <SharePage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
