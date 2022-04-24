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
        <q-input
          class="q-mb-sm"
          filled
          placeholder="Placeholder"
          :dense="true"
        />
        <q-input filled placeholder="Placeholder" :dense="true" />
      </q-card-section>
    </q-card>
  </q-page>
</template>
