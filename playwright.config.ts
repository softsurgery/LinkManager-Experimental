import { PlaywrightTestConfig } from "@playwright/test";

const port = process.env.PORT || "4173";
const webServerCommands = [
  ...(!process.env.FAVLIST_TEST_NO_BUILD ? ["yarn build:dev"] : []),
  `yarn serve:renderer --port ${port}`,
].join(" && ");

const config: PlaywrightTestConfig = {
  testDir: "./e2e-tests",
  maxFailures: 2,
  webServer: {
    command: webServerCommands,
    port: Number.parseInt(port, 10),
  },
};

export default config;
