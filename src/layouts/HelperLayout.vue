<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="bg-primary text-white"
      container
      style="height: 150px"
    >
      <q-toolbar>
        <q-toolbar-title class="q-mt-lg q-ml-md text-h5">
          <strong> Welcome, NAME </strong>
          <br />
          What would you like to do today?
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

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
