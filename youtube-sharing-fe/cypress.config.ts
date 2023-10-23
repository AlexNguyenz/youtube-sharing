import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  numTestsKeptInMemory: 10,
  video: false,
  screenshotOnRunFailure: false,
  fixturesFolder: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
});
