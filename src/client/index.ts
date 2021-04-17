/* eslint-disable @typescript-eslint/no-var-requires */
import { createApp } from "vue";
import App from "@/App";
import createRouter from "@/router";
import { Router } from "vue-router";
import { store } from "./store";
import { Store } from "vuex";
import { RootState } from "@/typings";

const render = (
  Component: any,
  createRouter: () => Router,
  store: Store<RootState>
) => {
  const app = createApp(Component);
  const router = createRouter();
  app.use(router);
  app.use(store);
  router.isReady().then(() => {
    app.mount("#app");
  });
};

render(App, createRouter, store);

if ((module as any).hot) {
  (module as any).hot.accept(
    ["@/App.tsx", "@/router/index.ts", "@/store/index.ts"],
    () => {
      const NextApp = require("@/App.tsx").default;
      const nextCreateRouter = require("@/router").default;
      const nextStore = require("./store").store;
      render(NextApp, nextCreateRouter, nextStore);
    }
  );
}
