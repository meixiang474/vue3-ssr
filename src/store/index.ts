import { AxiosInstance } from "axios";
import { createStore, Store } from "vuex";
import createHome from "./modules/home";
import createCancel from "./modules/cancel";
import { RootState } from "@/typings";

export default (request: AxiosInstance): Store<RootState> => {
  const home = createHome(request);
  const cancel = createCancel();
  const store = createStore({
    modules: { home, cancel },
  });
  if (typeof window != "undefined" && SSR) {
    console.log(1);
    console.log(window.context.state);
    store.replaceState(window.context.state);
  }
  return store;
};
