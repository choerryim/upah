<template>
  <q-page class="helper-page">
    <q-card flat class="header-card">
      <div class="text-h6 text-medium text-white text-center q-pa-xl">
        ACTIVITY
      </div>
    </q-card>
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="pending" label="PENDING" />
        <q-tab name="accepted" label="ACCEPTED" />
        <q-tab name="rejected" label="REJECTED" />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="pending">
          <activity-card
            username="Rose"
            description="Help me with babysitting my kid for 2 hour"
            rating="5.0"
          />
        </q-tab-panel>

        <q-tab-panel name="rejected">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="accepted">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
<script>
import ActivityCard from "components/ActivityCard.vue";

export default {
  components: {
    ActivityCard,
  },

  data() {
    return {
      tab: "pending",
    };
  },
};
</script>
