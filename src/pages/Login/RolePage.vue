<template>
  <q-page class="role-page column">
    <div class="q-ml-xl q-mt-md col-1 column reverse">
      <div class="text-body1 text-grey">What would you like to do today?</div>
      <div class="text-h5 text-bold">
        Welcome, {{ (username ? username : "User!").toUpperCase() }}
      </div>
    </div>
    <div class="col column">
      <q-card
        class="shadow-up-4 role-card bg-primary column justify-center items-center col-6"
        style="top: 50px"
        @click="onClickHelp"
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
        @click="onClickFind"
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
import { getAuth } from "firebase/auth";

export default {
  created() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      this.username = user.displayName;
    }
  },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    onClickHelp() {
      this.$router.push({ name: "helperpage" });
    },
    onClickFind() {
      this.$router.push({ name: "clientpage" });
    },
  },
};
</script>
