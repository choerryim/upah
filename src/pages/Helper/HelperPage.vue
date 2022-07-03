<template>
  <q-page class="helper-page" style="display: flex; flex-direction: column">
    <q-card flat class="header-content q-mb-lg">
      <q-card-section class="row reverse" style="padding-right: 0">
        <q-card
          flat
          class="text-center bg-secondary col-4 role-button row justify-center items-center"
          @click="onClickGoToRole"
        >
          <div class="text-h6 role-text">ROLE</div>
          <q-icon
            class="text-white arrow-text"
            name="chevron_right"
            size="lg"
          />
        </q-card>
      </q-card-section>

      <q-card-section class="q-ml-md" style="padding-top: 0">
        <div class="text-h6 text-medium text-white">
          Welcome, {{ (username ? username : "User!").toUpperCase() }}
        </div>
        <div class="text-body2 text-weight-light text-white">
          What would you like to do today?
        </div>
      </q-card-section>
    </q-card>

    <div class="q-ma-md">
      <div class="q-mb-sm">
        <q-img
          :src="banner"
          spinner-color="white"
          style="height: 170px; max-width: 400px"
          img-class="my-custom-image"
          class="rounded-borders"
        >
        </q-img>
      </div>

      <div class="row">
        <q-card flat class="my-card col help-card">
          <q-card-section>
            <div class="text-body2">Help someone today!</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-scroll-area v-if="upahs.length > 0" class="helper-list-container">
      <upah-card
        class="upah-container"
        v-for="upah in upahs"
        :key="upah.id"
        :upahdetails="upah"
        @click="onClickUpah(upah)"
      />
    </q-scroll-area>
    <div
      v-else
      class="q-mb-sm q-mt-md"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <q-img
        :src="banner_empty"
        spinner-color="white"
        style="height: 200px; max-width: 280px"
        img-class="my-custom-image"
        class="rounded-borders"
      >
      </q-img>
      <div
        class="text-weight-medium text-center text-grey-8 q-mt-sm"
        style="font-size: 1.2rem"
      >
        No Upah at this moment, enjoy your time!
      </div>
    </div>
  </q-page>
</template>
<script>
import UpahCard from "components/UpahCard.vue";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "src/boot/firebase";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    UpahCard,
  },
  async created() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      this.username = user.displayName;
      this.userid = user.uid;
    }

    await this.getUpahList();
  },
  computed: {
    banner() {
      return require("src/assets/helper_main.png");
    },
    banner_empty() {
      return require("src/assets/helper_empty.jpg");
    },
  },
  data() {
    return {
      userid: "",
      username: "",
      upahs: [],
    };
  },
  methods: {
    onClickGoToRole() {
      this.$router.push({ name: "rolepage" });
    },
    onClickUpah(upah) {
      this.$router.push({
        name: "upahdetailspage",
        params: { upah: JSON.stringify(upah) },
      });
    },
    async getUpahList() {
      const q = query(
        collection(db, "Upah"),
        where("userid", "!=", this.userid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const upah = {
          ...data,
          id: doc.id,
        };

        this.upahs.push(upah);
      });
    },
  },
};
</script>
