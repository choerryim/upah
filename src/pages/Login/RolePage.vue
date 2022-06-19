<template>
  <q-page class="role-page column">
    <div class="q-ml-xl q-mt-md col-1 column reverse">
      <div class="text-h5 text-bold">Welcome, NAME</div>
      <div class="text-body1 text-grey">What would you like to do today?</div>
    </div>
    <div class="col column">
      <q-card
        class="shadow-up-4 role-card bg-primary column justify-center items-center col-6"
        style="top: 50px"
      >
        <q-card-section>
          <q-btn square>
            <q-avatar size="">
              <img src="" />
            </q-avatar>
          </q-btn>
          <div class="text-body2 text-center text-grey q-mt-sm">HELP</div>
        </q-card-section>
      </q-card>

      <q-card
        class="role-card shadow-up-4 bg-secondary column justify-center items-center col-6"
      >
        <q-card-section>
          <q-btn square>
            <q-avatar size="">
              <img src="" />
            </q-avatar>
          </q-btn>
          <div class="text-body2 text-center text-grey q-mt-sm">
            FIND HELPER
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      name: "RolePage",
    };
  },
};
</script>
