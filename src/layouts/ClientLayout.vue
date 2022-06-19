<template>
  <q-layout class="client-page" view="hHh lpR fFf">
    <div class="client-header"></div>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-primary-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
