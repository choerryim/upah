<template>
  <q-layout view="hHh lpR fff">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="false" elevated class="bg-primary-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>