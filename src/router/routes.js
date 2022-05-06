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
    children: [
      { path: "", component: () => import("pages/HelperPage.vue") },
      {
        path: "upahdetails",
        component: () => import("pages/UpahDetailsPage.vue"),
      },
      {
        path: "detailsprofile",
        component: () => import("pages/UpahDetailsProfilePage.vue"),
      },
      {
        path: "activity",
        component: () => import("pages/HelperActivityPage.vue"),
      },
    ],
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
