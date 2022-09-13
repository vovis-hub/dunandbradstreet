import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    video: false,
    watchForFileChanges: false,
    numTestsKeptInMemory: 0,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
