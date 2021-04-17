import { Router } from "vue-router";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
} from "vue-router";
import routes from "./routes";

const isServer = typeof window === "undefined";

const history = isServer ? createMemoryHistory() : createWebHistory();

export default (): Router => {
  return createRouter({ routes, history });
};
