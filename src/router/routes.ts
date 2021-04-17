import { RouteRecordRaw } from "vue-router";
import Home from "@/containers/Home";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(
        /* webpackChunkName: "notFound" */ /* webpackPrefetch: true */ "@/containers/NotFound"
      ),
  },
];

export default routes;
