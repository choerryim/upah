import router from ".";

const routes = [
  {
    path: "/login/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "loginpage",
        component: () => import("pages/Login/LoginPage.vue"),
        meta: {
          noAuth: true,
        },
      },
      {
        path: "register",
        name: "registerpage",
        component: () => import("pages/Login/RegisterPage.vue"),
        meta: {
          noAuth: true,
        },
      },
      { path: "mainpage", component: () => import("pages/Login/MainPage.vue") },
    ],
    meta: {
      noAuth: true,
    },
  },
  {
    path: "/helper/",
    component: () => import("layouts/HelperLayout.vue"),
    children: [
      {
        name: "helperpage",
        path: "",
        component: () => import("pages/Helper/HelperPage.vue"),
      },
      {
        name: "upahdetailspage",
        path: "upahdetails",
        component: () => import("pages/Helper/UpahDetailsPage.vue"),
      },
      {
        name: "detailsprofilepage",
        path: "detailsprofile",
        component: () => import("pages/Helper/UpahDetailsProfilePage.vue"),
      },
      {
        path: "activity",
        component: () => import("pages/Helper/HelperActivityPage.vue"),
      },
      {
        name: "usereditprofilepage",
        path: "usereditprofile",
        component: () => import("pages/Helper/UserEditProfilePage.vue"),
      },
    ],
  },
  {
    path: "/client/",
    component: () => import("layouts/ClientLayout.vue"),
    children: [
      {
        name: "clientpage",
        path: "",
        component: () => import("pages/Client/ClientPage.vue"),
      },
      {
        name: "clientupahdetailspage",
        path: "clientupahdetails",
        component: () => import("pages/Client/ClientUpahDetailsPage.vue"),
      },
      {
        name: "addupahpage",
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
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        name: "rolepage",
        path: "",
        component: () => import("pages/Login/RolePage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
