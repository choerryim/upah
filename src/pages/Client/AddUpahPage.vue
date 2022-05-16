<template>
  <q-page class="helper-page">
    <div flat class="my-card q-ma-md">
      <div class="column">
        <div class="text-bold text-body1 q-pb-xs">Title</div>
        <q-input
          outlined
          style="background-color: rgba(0, 0, 0, 0.08)"
          class="q-mb-md"
        />
      </div>

      <div class="column">
        <div class="text-bold text-body1 q-pb-xs">Description</div>
        <q-input
          outlined
          style="background-color: rgba(0, 0, 0, 0.08)"
          class="q-mb-md"
        />
      </div>

      <div class="column">
        <div class="text-bold text-body1 q-pb-xs">Date</div>
        <q-input
          outlined
          style="background-color: rgba(0, 0, 0, 0.08)"
          class="q-mb-md"
        />
      </div>

      <div class="column">
        <div class="text-bold text-body1 q-pb-xs">Time</div>
        <q-input
          outlined
          style="background-color: rgba(0, 0, 0, 0.08)"
          class="q-mb-md"
        />
      </div>

      <div class="column">
        <div class="text-bold text-body1 q-pb-xs">Offer</div>
        <q-input
          outlined
          style="background-color: rgba(0, 0, 0, 0.08)"
          class="q-mb-md"
        />
      </div>

      <div class="row justify-between">
        <q-btn class="text-black" rounded color="secondary" label="CANCEL" />
        <q-btn class="text-black" rounded color="secondary" label="POST" />
      </div>
    </div>
  </q-page>
</template>
