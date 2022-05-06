<template>
  <q-card flat bordered class="review-card q-mx-lg">
    <q-card-section class="row">
      <div class="col-2">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </div>

      <div class="col">
        <div class="text-body1 text-bold q-pl-xs">{{ username }}</div>
        <q-icon class="star-text arrow-text q-pl-xs" name="star" size="xs" />
        <span class="text-caption text-grey q-ml-sm">{{ rating }}</span>
        <div class="text-body2 q-pt-xs q-pl-xs">
          {{ review }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: "Missing name",
    },
    review: {
      type: String,
      default: "No review",
    },
    rating: {
      type: Number,
      default: 5,
    },
  },
};
</script>
