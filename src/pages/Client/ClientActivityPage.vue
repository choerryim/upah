<template>
  <q-page class="helper-page">
    <q-card flat class="header-card">
      <div class="text-h6 text-medium text-white text-center q-pa-xl">
        ACTIVITY
      </div>
    </q-card>
    <upah-card
      class="q-mt-lg"
      username="Aina Aqilah"
      description="Cuci tandas"
    />
  </q-page>
</template>
<script>
import UpahCard from "components/UpahCard.vue";

export default {
  components: {
    UpahCard,
  },
};
</script>
