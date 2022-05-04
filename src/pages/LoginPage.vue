<template>
  <q-page class="login flex flex-center">
    <div class="absolute bg">
      <div class="section bg-primary"></div>
      <div class="section bg-secondary"></div>
    </div>
    <q-card class="login-card">
      <q-card-section class="flex justify-center q-my-xs">
        <div class="image-holder" style="left: 10%">
          <img src="https://picsum.photos/id/237/200/300" />
        </div>
        <div class="image-holder" style="right: 10%; top: 1.5em">
          <img src="https://picsum.photos/id/238/200/300" />
        </div>
      </q-card-section>
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
