import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "youtube-sharing",
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

  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
