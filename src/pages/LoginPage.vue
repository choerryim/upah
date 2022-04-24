<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section class="flex column">
        <div class="text-h5 text-center q-mb-xs">Login</div>
        <div class="text-body1 text-center text-grey">
          Please enter the details below
        </div>
      </q-card-section>
      <q-card-section class="flex column">
        <q-input class="q-mb-sm" filled placeholder="Email" :dense="true" />
        <q-input filled placeholder="Password" :dense="true" />
        <div class="text-body2 text-right q-mt-sm text-grey">
          Forgot Password?
        </div>
      </q-card-section>
      <q-card-section class="flex column">
        <q-btn rounded color="secondary" label="LOGIN" />
      </q-card-section>
      <q-card-section>
        <div class="text-body2 text-center text-grey">
          Don't have account? Register!
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
