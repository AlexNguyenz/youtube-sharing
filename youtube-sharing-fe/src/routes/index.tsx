import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "~/layouts/AppLayout";
import HomePage from "~/pages/HomePage";
import PrivateRoute from "./PrivateRoute";
import SharePage from "~/pages/SharePage";
import NotFound from "~/pages/NotFound";
import { useRecoilState, useRecoilValue } from "recoil";
import authState from "~/stores/user";
import SocketService from "~/socket/socketService";
import notificationState from "~/stores/notification";

const MainRoutes = () => {
  const [notification, setNotification] = useRecoilState(notificationState);
  const { email, accessToken } = useRecoilValue(authState);
  const isLogged = email && accessToken;
  const socketService = SocketService.getInstance();
  const socket = socketService.getSocket();

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("notification", (data) => {
      const socketId = socket.id;
      const { title, email, sender } = data;
      if (sender !== socketId && !!isLogged) {
        const newNotification = [
          ...notification.notifications,
          { title, email },
        ];
        setNotification({ notifications: newNotification, state: true });
      }
    });

    return () => {
      socket.off("connect");
      socket.off("notification");
    };
  }, [socket, isLogged, setNotification, notification.notifications]);
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
