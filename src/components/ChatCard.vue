<template>
  <q-card flat bordered class="upah-card q-mx-none">
    <q-card-section class="row">
      <div class="col-2">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </div>

      <div class="col">
        <div class="text-body1 text-bold">{{ username }}</div>
        <div class="text-body2 q-pt-xs">
          {{ chat }}
        </div>
      </div>

      <div class="col-2">
        <div class="text-body2">{{ time }}</div>
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
    chat: {
      type: String,
      default: "No chat",
    },
    time: Date,
  },
};
</script>
