import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDmTTnd6Zr2ftxVa-iCd-p62pggqMXQ_Cs",
  authDomain: "upah-6ff37.firebaseapp.com",
  projectId: "upah-6ff37",
  storageBucket: "upah-6ff37.appspot.com",
  messagingSenderId: "560457260861",
  appId: "1:560457260861:web:8fd13f26a08beef28c6f54",
};

// Initialize Firebase
initializeApp(firebaseConfig);

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
    if (to.matched.some((record) => !record.meta.noAuth)) {
      if (await getCurrentUser()) {
        next();
      } else {
        next("/login");
      }
    } else {
      next();
    }
  });

  return Router;
});
