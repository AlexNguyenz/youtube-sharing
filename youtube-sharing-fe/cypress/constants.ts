import { NotificationType } from "~/components/Toast";

export const CONSTANT_DATA_CY = {
  NOTIFICATION: '[data-cy="notification"]',
  EMAIL: '[data-cy="email"]',
  PASSWORD: '[data-cy="password"]',
  SHARE_MOVIE: '[data-cy="share-movie"]',
  LOGOUT: '[data-cy="logout"]',
  LOGIN: '[data-cy="login"]',
  REGISTER: '[data-cy="register"]',
  MENU: '[data-cy="menu"]',
  SHARE: '[data-cy="share"]',
  MESSAGE_NOTIFICATION: "div.ant-notification-notice-message",
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

export const initToastState = {
  type: "success" as NotificationType,
  message: "Successfully",
};

export const mockVideo = {
  id: "Xs5TbbFQuDw",
  url: "https://www.youtube.com/watch?v=Xs5TbbFQuDw",
  title:
    "[Audio] Đi Về Phía Thinh Lặng (ft. Orange) | Lang Thang Hát Cùng Bùi Anh Tuấn",
  description:
    "Lang Thang Hát Cùng Bùi Anh Tuấn\nĐI VỀ PHÍA THINH LẶNG (ft. Orange)\nSáng tác: Châu Đăng Khoa\n\n▶ https://buianhtuan.lnk.to/LTHCBAT\n▶ https://buianhtuan.lnk.to/LTHCBATAudio\n\n#BuiAnhTuan #LangThangHatCungBuiAnhTuan #DiVePhiaThinhLang #Orange\n#TProduction #Yeah1\n\n/ Follow Bui Anh Tuan /\nhttps://buianhtuan.lnk.to/YouTube\nhttps://buianhtuan.lnk.to/Facebook\nhttps://buianhtuan.lnk.to/Spotify\nhttps://buianhtuan.lnk.to/AppleMusic\nhttps://buianhtuan.lnk.to/NCT\n\n/ Contact Us /\nEmail | buianhtuan.booking@gmail.com\nHotline | 0909 805 200\nAddress | The Gold View, 346 Ben Van Don St, Ward 1, District 4, HCMC\n\n©2018 T Production & Bui Anh Tuan. All rights reserved",
  statistics: {
    viewCount: "18111329",
    likeCount: "42964",
    dislikeCount: "0",
    favoriteCount: "0",
    commentCount: "1519",
    _id: "65388740e8129ecbea510069",
  },
  userEmail: "test@gmail.com",
  _id: "65388740e8129ecbea510068",
  __v: 0,
};
