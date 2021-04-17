import { createStore, Store } from "vuex";
import home from "./modules/home";

export default (): Store<any> => {
  const store = createStore({
    modules: { home },
  });
  return store;
};
