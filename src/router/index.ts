import { Router } from "vue-router";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
} from "vue-router";
import routes from "./routes";
import { store } from "@/client/store";
import { Canceler } from "axios";
import * as Types from "@/store/constants";

const isServer = typeof window === "undefined";

const history = isServer ? createMemoryHistory() : createWebHistory();

export default (): Router => {
  const router = createRouter({ routes, history });
  router.beforeEach((to, from, next) => {
    const { cancels } = store.state.cancel;
    Object.keys(cancels).forEach((key) => {
      if (cancels[key]) {
        (cancels[key] as Canceler)();
      }
    });
    store.commit(`cancel/${Types.CHNAGE_CANCELS}`, {});
    next();
  });
  return router;
};
