<template>
  <q-page class="register flex flex-center">
    <div class="absolute bg">
      <div class="section bg-primary"></div>
      <div class="section bg-secondary"></div>
    </div>
    <q-card class="login-card flex column justify-center">
      <q-card-section class="flex column">
        <div class="text-h5 text-center q-mb-xs">Create Account</div>
        <div class="text-body2 text-center text-grey">
          Please enter details below
        </div>
      </q-card-section>
      <q-card-section class="flex column">
        <q-input class="q-mb-sm" filled placeholder="Name" :dense="true" />
        <q-input class="q-mb-sm" filled placeholder="Email" :dense="true" />
        <q-input class="q-mb-sm" filled placeholder="Password" :dense="true" />
        <q-input filled placeholder="Confirm Password" :dense="true" />
      </q-card-section>
      <q-card-section class="flex column">
        <q-btn rounded color="secondary" label="SIGN UP" />
      </q-card-section>
      <q-card-section>
        <div class="text-body2 text-center text-grey">
          Already have an account? Login
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
