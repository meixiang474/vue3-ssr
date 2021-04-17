/* eslint-disable @typescript-eslint/no-var-requires */
import { createApp } from "vue";
import App from "@/App";
import createRouter from "@/router";
import { Router } from "vue-router";
import createStore from "@/store";
import { Store } from "vuex";

const render = (
  Component: any,
  createRouter: () => Router,
  createStore: () => Store<any>
) => {
  const app = createApp(Component);
  const router = createRouter();
  const store = createStore();
  app.use(router);
  app.use(store);
  router.isReady().then(() => {
    app.mount("#app");
  });
};

render(App, createRouter, createStore);

if ((module as any).hot) {
  (module as any).hot.accept(
    ["@/App.tsx", "@/router/index.ts", "@/store/index.ts"],
    () => {
      const NextApp = require("@/App.tsx").default;
      const nextCreateRouter = require("@/router").default;
      const nextCreateStore = require("@/store/index");
      render(NextApp, nextCreateRouter, nextCreateStore);
    }
  );
}
