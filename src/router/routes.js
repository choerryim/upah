const routes = [
  {
    path: "/login/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Login/LoginPage.vue") },
      {
        path: "register",
        component: () => import("pages/Login/RegisterPage.vue"),
      },
      { path: "rolepage", component: () => import("pages/RolePage.vue") },
    ],
  },
  {
    path: "/helper/",
    component: () => import("layouts/HelperLayout.vue"),
    children: [{ path: "", component: () => import("pages/HelperPage.vue") }],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
