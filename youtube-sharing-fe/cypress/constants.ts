export const CONSTANT_DATA_CY = {
  NOTIFICATION: '[data-cy="notification"]',
  EMAIL: '[data-cy="email"]',
  PASSWORD: '[data-cy="password"]',
  SHARE_MOVIE: '[data-cy="share-movie"]',
  LOGOUT: '[data-cy="logout"]',
  LOGIN: '[data-cy="login"]',
  REGISTER: '[data-cy="register"]',
  MENU: '[data-cy="menu"]',
} as const;

export const initAuthState = {
  email: "test@gmail.com",
  accessToken: "accessToken@123",
};

export const initNotificationStateUnread = {
  state: true,
  notifications: [
    {
      title: "Sơn Tùng MTP - Remember Me (SlimV 2017 Mix)",
      email: "test@gmail.com",
    },
  ],
};

export const initNotificationStateRead = {
  state: false,
  notifications: [
    {
      title: "Sơn Tùng MTP - Remember Me (SlimV 2017 Mix)",
      email: "test@gmail.com",
    },
  ],
};
