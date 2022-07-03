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
          <img
            :src="helperIcon"
            class="shadow-3"
            style="width: 10vh; height: 10vh; border-radius: 20px"
          />
          <div
            class="text-weight-bold text-center text-grey-9 q-mt-sm"
            style="font-size: 1rem"
          >
            HELP
          </div>
        </q-card-section>
      </q-card>

      <q-card
        class="role-card shadow-up-4 bg-secondary column justify-center items-center col-6"
        @click="onClickFind"
      >
        <q-card-section>
          <img
            :src="clientIcon"
            class="shadow-3"
            style="width: 10vh; height: 10vh; border-radius: 20px"
          />
          <div
            class="text-weight-bold text-center text-grey-9 q-mt-sm"
            style="font-size: 1rem"
          >
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
  computed: {
    helperIcon() {
      return require("src/assets/helphand.png");
    },
    clientIcon() {
      return require("src/assets/findhelp.png");
    },
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
