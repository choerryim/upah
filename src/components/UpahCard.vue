<template>
  <q-card flat bordered class="upah-card q-mx-md">
    <q-card-section class="row">
      <div class="col-2">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </div>

      <div class="col">
        <div class="text-body1 text-bold">{{ username }}</div>
        <q-icon class="star-text arrow-text" name="star" size="xs" />
        <span class="text-caption text-grey q-ml-sm">{{ rating }}</span>
        <div class="text-body2 q-pt-xs">
          {{ description }}
        </div>
        <span class="text-caption text-grey">{{ date }}</span>
      </div>

      <div class="col-2">
        <div class="price-text text-h6">RM{{ price }}</div>
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
