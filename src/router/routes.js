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
        name: "helperactivitypage",
        path: "activity",
        component: () => import("pages/Helper/HelperActivityPage.vue"),
      },
      {
        name: "usereditprofilepage",
        path: "usereditprofile",
        component: () => import("pages/Helper/UserEditProfilePage.vue"),
      },
      {
        name: "verificationpage",
        path: "verification",
        component: () => import("pages/Login/VerificationPage.vue"),
      },
      {
        name: "helperchatpage",
        path: "helperchat",
        component: () => import("pages/Helper/HelperChatPage.vue"),
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
        name: "clientchatpage",
        path: "clientchat",
        component: () => import("pages/Client/ClientChatPage.vue"),
      },
      {
        name: "clientprofilepage",
        path: "clientprofile",
        component: () => import("pages/Client/ClientProfilePage.vue"),
      },
      {
        name: "clienteditprofilepage",
        path: "clienteditprofile",
        component: () => import("pages/Client/ClientUserEditProfilePage.vue"),
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
      {
        name: "chatpage",
        path: "clientchatdetails",
        component: () => import("pages/Client/ClientChatDetailsPage.vue"),
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
