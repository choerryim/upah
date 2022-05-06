<template>
  <q-page>
    <q-card class="detailsprofile-card">
      <q-card-section>
        <q-card-section class="row justify-center">
          <div class="row col-3">
            <q-avatar style="width: 100%; height: 100%">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </div>

          <div class="col">
            <div class="text-body1 text-bold q-pl-md">Name</div>
            <q-icon
              class="star-text arrow-text q-pl-md"
              name="star"
              size="xs"
            />
            <span class="text-caption q-ml-sm">5.0 (3)</span>
            <div class="text-body2 q-pt-xs q-pl-md">Joined 2020</div>
          </div>
        </q-card-section>
      </q-card-section>
      <q-card-section class="text-bold text-body1 q-pb-xs q-pl-xl q-pt-none">
        About Me
      </q-card-section>
      <q-card-section class="text-lightweight text-body2 q-pt-none q-pl-xl">
        I am Christine. Nice to meet you.
      </q-card-section>
    </q-card>

    <q-card-section class="text-bold text-body1 q-pb-sm q-pl-lg q-pt-none">
      Reviews
    </q-card-section>

    <review-card username="Mirooon" review="baik pak" />
  </q-page>
</template>
<script>
import ReviewCard from "../components/ReviewCard.vue";

export default {
  components: {
    ReviewCard,
  },
};
</script>
