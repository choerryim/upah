<template>
  <div class="activity-card">
    <q-card-section class="row">
      <div class="col-2">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </div>

      <div class="col">
        <div class="row justify-between">
          <div class="text-body1 text-bold">{{ username }}</div>
          <div class="col-4.5">
            <div class="viewprofile-text text-body2">VIEW PROFILE</div>
          </div>
        </div>
        <q-icon class="yellowstar-text arrow-text" name="star" size="xs" />
        <span class="text-caption text-grey q-ml-sm">{{ rating }}</span>
        <div class="text-body2 q-pt-xs">
          Wants to help with: {{ description }}
        </div>
        <span class="text-caption text-grey">{{ date }}</span>
        <div class="row justify-between q-pt-md">
          <q-btn rounded color="secondary" text-color="dark" label="CHAT" />
          <div>
            <q-icon class="accept-text" name="done" size="md" />
            <q-icon class="reject-text" name="close" size="md" />
          </div>
        </div>
      </div>
    </q-card-section>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: "Missing name",
    },
    description: {
      type: String,
      default: "No description",
    },
    rating: {
      type: Number,
      default: 5,
    },
    date: Date,
    price: {
      type: Number,
      default: 50,
    },
  },
};
</script>
