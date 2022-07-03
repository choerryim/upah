<template>
  <q-page>
    <q-card flat class="header-content q-mb-lg">
      <q-card-section class="row reverse" style="padding-right: 0">
        <q-card
          flat
          class="text-center bg-primary col-4 role-button row justify-center items-center"
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
        <div class="text-h6 text-medium darker-text">
          Welcome, {{ username || "User" }}!
        </div>
        <div class="text-body2 text-weight-light darker-text">
          What would you like to advertise today?
        </div>
      </q-card-section>
    </q-card>

    <div class="q-ma-md">
      <div
        v-if="upahs.length > 0"
        class="q-mb-sm"
        style="display: flex; justify-content: center"
      >
        <q-img
          :src="banner"
          spinner-color="white"
          style="height: 200px; max-width: 280px"
          img-class="my-custom-image"
          class="rounded-borders"
        >
        </q-img>
      </div>

      <div class="row">
        <q-card flat class="col client-card">
          <q-card-section>
            <div class="text-body2">Upah someone today!</div>
          </q-card-section>
        </q-card>
      </div>
      <div
        class="q-mt-lg q-ml-md text-weight-bold text-secondary"
        style="font-size: 1.2rem"
      >
        My Upah
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
          Your Upah is empty...
        </div>
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
  data() {
    return {
      username: "",
      userid: "",
      upahs: [],
    };
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
      return require("src/assets/client_main.png");
    },
    banner_empty() {
      return require("src/assets/client_empty.jpg");
    },
  },
  methods: {
    onClickGoToRole() {
      this.$router.push({ name: "rolepage" });
    },
    onClickUpah(upah) {
      this.$router.push({
        name: "clientupahdetailspage",
        params: { upah: JSON.stringify(upah) },
      });
    },
    async getUpahList() {
      const q = query(
        collection(db, "Upah"),
        where("userid", "==", this.userid)
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
  components: {
    UpahCard,
  },
};
</script>
