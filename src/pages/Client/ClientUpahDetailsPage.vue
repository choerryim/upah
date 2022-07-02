<template>
  <q-page>
    <q-card flat class="header-content row">
      <q-card-section class="row justify-center items-center">
        <div class="row col-4">
          <q-avatar style="width: 90%; height: auto">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </div>

        <div class="col text-black">
          <div class="text-body1 text-bold">{{ formattedName }}</div>
          <q-icon class="star-text arrow-text" name="star" size="xs" />
          <span class="text-caption q-ml-sm">
            {{ formatRating }}
          </span>
          <div class="text-body2 q-pt-xs">{{ formattedJoinedDate }}</div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat class="my-card q-ma-xl">
      <q-card-section class="text-bold text-body1 q-pb-xs">
        Title
      </q-card-section>
      <q-card-section class="text-lightweight text-body2 q-pt-none">
        {{ upah.title }}
      </q-card-section>

      <q-card-section class="text-bold text-body1 q-pb-xs">
        Description
      </q-card-section>
      <q-card-section class="text-lightweight text-body2 q-pt-none">
        {{ upah.desc }}
      </q-card-section>

      <q-card-section class="text-bold text-body1 q-pb-xs">
        Date
      </q-card-section>
      <q-card-section class="text-lightweight text-body2 q-pt-none">
        {{ date }}
      </q-card-section>

      <q-card-section class="text-bold text-body1 q-pb-xs">
        Time
      </q-card-section>
      <q-card-section class="text-lightweight text-body2 q-pt-none">
        {{ time }}
      </q-card-section>

      <q-card-section class="text-bold text-body1 q-pb-xs">
        Offer
      </q-card-section>
      <q-card-section class="text-lightweight text-body2 q-pt-none">
        RM {{ upah.price }}
      </q-card-section>
      <q-card-section class="flex flex-center">
        <q-btn
          rounded
          color="secondary"
          text-color="dark"
          label="EDIT"
          style="width: 30vw"
          @click="onEditUpah"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/boot/firebase";
import dayjs from "dayjs";

export default {
  data() {
    return {
      upah: {},
      time: "",
      date: "",
      user: {},
      rating: "",
    };
  },
  computed: {
    formatRating() {
      if (!this.user?.rating || !this.user?.total_rating) {
        return "no rating yet";
      }

      return `${this.user.rating(this.user.total_rating)}`;
    },
    formattedJoinedDate() {
      if (!this.user?.register_date) {
        return "";
      }
      return `Joined ${dayjs(this.user?.register_date).format("YYYY")}`;
    },
    formattedName() {
      if (!this.user?.username) {
        return "Missing username";
      }

      return this.user?.username.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      );
    },
  },
  mounted() {
    const upah = JSON.parse(this.$route.params.upah);

    this.upah = upah;
    this.time = dayjs(upah.date).format("hh a");
    this.date = dayjs(upah.date).format("DD - MM - YYYY");
    this.getUser();
  },
  methods: {
    async getUser() {
      const docRef = doc(db, "User", this.upah?.userid || "missing id");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        this.user = {
          ...data,
          register_date: data.register_date.toDate(),
        };
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    onClickProfile() {
      if (!this.upah?.userid) return;

      this.$router.push({
        name: "detailsprofilepage",
        params: { userid: this.upah?.userid },
      });
    },
    onEditUpah() {
      if (!this.upah) {
        this.$router.push({ name: "clientpage" });
      }

      this.$router.push({
        name: "addupahpage",
        params: { upah: JSON.stringify(this.upah) },
      });
    },
  },
};
</script>
