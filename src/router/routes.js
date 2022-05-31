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
      { path: "rolepage", component: () => import("pages/Login/RolePage.vue") },
      { path: "mainpage", component: () => import("pages/Login/MainPage.vue") },
    ],
  },
  {
    path: "/helper/",
    component: () => import("layouts/HelperLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Helper/HelperPage.vue") },
      {
        path: "upahdetails",
        component: () => import("pages/Helper/UpahDetailsPage.vue"),
      },
      {
        path: "detailsprofile",
        component: () => import("pages/Helper/UpahDetailsProfilePage.vue"),
      },
      {
        path: "activity",
        component: () => import("pages/Helper/HelperActivityPage.vue"),
      },
      {
        path: "userprofile",
        component: () => import("pages/Helper/UserProfilePage.vue"),
      },
    ],
  },
  {
    path: "/client/",
    component: () => import("layouts/ClientLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Client/ClientPage.vue") },
      {
        path: "clientupahdetails",
        component: () => import("pages/Client/ClientUpahDetailsPage.vue"),
      },
      {
        path: "addupah",
        component: () => import("pages/Client/AddUpahPage.vue"),
      },
      {
        path: "clientactivity",
        component: () => import("pages/Client/ClientActivityPage.vue"),
      },
      {
        path: "clientchat",
        component: () => import("pages/Client/ClientChatPage.vue"),
      },
      {
        path: "clientchatdetails",
        component: () => import("pages/Client/ClientChatDetailsPage.vue"),
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
