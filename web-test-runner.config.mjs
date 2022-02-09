import { playwrightLauncher } from "@web/test-runner-playwright";

export default {
  nodeResolve: true,
  files: ["test/**/*.test.js"],
  coverageConfig: {
    report: true,
    reportDir: "coverage",
    threshold: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  browsers: [playwrightLauncher({ product: "chromium" })],
};
