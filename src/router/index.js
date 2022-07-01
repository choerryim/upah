import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const removeListener = onAuthStateChanged(
        getAuth(),
        (user) => {
          removeListener();
          resolve(user);
        },
        reject
      );
    });
  };

  Router.beforeEach(async (to, from, next) => {
    if (await getCurrentUser()) {
      if (to.fullPath.includes("/login")) {
        next("/");
      } else {
        next();
      }
    } else {
      if (to.matched.some((record) => !record.meta.noAuth)) {
        next("/login");
      } else {
        next();
      }
    }

    // if (to.matched.some((record) => !record.meta.noAuth)) {
    //   if (await getCurrentUser()) {
    //       next();

    //   } else {
    //     next("/login");
    //   }
    // } else {
    //   next();
    // }
  });

  return Router;
});
