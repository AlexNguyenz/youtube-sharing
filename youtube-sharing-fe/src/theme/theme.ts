const CONSTANT = {
  height: {
    header: "64px",
    bottom: "50px",
  },
  width: {
    maxWidth: "1440px",
  },
};

const BREAKPOINT = {
  xs: "375px",
  sm: "576px",
  md: "768px",
  lg: "1200px",
  xxl: "1440px",
};

export default {
  constant: {
    height: {
      header: CONSTANT.height.header,
      bottom: CONSTANT.height.bottom,
    },
    width: {
      maxWidth: CONSTANT.width.maxWidth,
    },
  },
  breakpoint: {
    xs: BREAKPOINT.xs,
    sm: BREAKPOINT.sm,
    md: BREAKPOINT.md,
    lg: BREAKPOINT.lg,
    xxl: BREAKPOINT.xxl,
  },
};
