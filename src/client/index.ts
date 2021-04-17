/* eslint-disable @typescript-eslint/no-var-requires */
import { createApp } from "vue";
import App from "@/App";
import createRouter from "@/router";
import { Router } from "vue-router";

const render = (Component: any, createRouter: () => Router) => {
  const app = createApp(Component);
  const router = createRouter();
  app.use(router);
  router.isReady().then(() => {
    app.mount("#app");
  });
};

render(App, createRouter);

if ((module as any).hot) {
  (module as any).hot.accept(["@/App.tsx", "@/router/index.ts"], () => {
    const NextApp = require("@/App.tsx").default;
    const nextCreateRouter = require("@/router").default;
    render(NextApp, nextCreateRouter);
  });
}
