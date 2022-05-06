<template>
  <q-page class="helper-page">
    <q-card flat class="header-card q-mb-lg">
      <q-card-section class="row reverse" style="padding-right: 0">
        <q-card
          flat
          class="text-center bg-secondary col-4 role-button row justify-center items-center"
        >
          <div class="text-h6 role-text">ROLE</div>
          <q-icon
            class="text-white arrow-text"
            name="chevron_right"
            size="lg"
          />
        </q-card>
      </q-card-section>

      <q-card-section class="q-ml-md" style="padding-top: 0">
        <div class="text-h6 text-medium text-white">Welcome, NAME</div>
        <div class="text-body2 text-weight-light text-white">
          What would you like to do today?
        </div>
      </q-card-section>
    </q-card>

    <div class="q-ma-md">
      <div class="q-mb-sm">
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          spinner-color="white"
          style="height: 170px; max-width: 400px"
          img-class="my-custom-image"
          class="rounded-borders"
        >
        </q-img>
      </div>

      <div class="row">
        <q-card flat class="my-card col help-card">
          <q-card-section>
            <div class="text-body2">Help someone today!</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <upah-card username="Aina Aqilah" description="Cuci tandas" />
  </q-page>
</template>
<script>
import UpahCard from "../components/UpahCard.vue";

export default {
  components: {
    UpahCard,
  },
};
</script>
