<template>
  <q-page class="client-page">
    <q-card flat class="header-content">
      <div class="text-h6 text-medium text-black text-center q-pa-xl">
        ACTIVITY
      </div>
    </q-card>

    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="REQUEST" label="REQUEST" />
      <q-tab name="ACCEPTED" label="ACCEPTED" />
      <q-tab name="REJECTED" label="REJECTED" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="REQUEST" class="no-padding">
        <upah-card
          bottomborder
          username="Aina Aqilah"
          description="Cuci tandas"
        />
      </q-tab-panel>

      <q-tab-panel name="ACCEPTED">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="REJECTED">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>
<script>
import UpahCard from "components/UpahCard.vue";

export default {
  components: {
    UpahCard,
  },
  data() {
    return {
      tab: "REQUEST",
    };
  },
};
</script>
