<template>
  <q-page class="helper-details-page">
    <q-card flat class="header-content row" @click="onClickProfile">
      <q-card-section class="row justify-center items-center">
        <div class="row col-4 q-mr-lg">
          <q-avatar style="width: 20vw; height: 20vw">
            <img :src="profilepictureurl" />
          </q-avatar>
        </div>

        <div class="col">
          <div class="text-body1 text-bold text-white">
            {{ formattedName }}
          </div>
          <q-icon
            class="star-text arrow-text text-white"
            name="star"
            size="xs"
          />
          <span class="text-caption q-ml-sm text-white">{{
            formatRating
          }}</span>
          <div class="text-body2 q-pt-xs text-white">
            {{ formattedJoinedDate }}
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat class="helper-details-body">
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
          color="primary"
          label="OFFER A HAND"
          @click="confirmOffer = true"
        />
      </q-card-section>
    </q-card>
    <q-dialog v-model="confirmOffer" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="handshake" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >Are you sure you want to help
            {{ this.user?.username || "User" }} ?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-avatar
            icon="done"
            color="green"
            text-color="white"
            v-close-popup
            @click="onConfirm"
          />
          <q-avatar
            class="q-ml-sm"
            icon="close"
            color="red"
            text-color="white"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "src/boot/firebase";
import dayjs from "dayjs";
import { getProfilePictureURL } from "src/scripts/firebase-helper";

export default {
  data() {
    return {
      upah: {},
      time: "",
      date: "",
      user: {},
      rating: "",
      confirmOffer: false,
      profilepictureurl: "",
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
  async created() {},
  async mounted() {
    if (!this.$route.params?.upah) {
      this.$router.push({ name: "helperpage" });
      return;
    }

    const upah = JSON.parse(this.$route.params.upah);
    this.profilepictureurl = await getProfilePictureURL(upah.userid);
    this.upah = upah;
    this.time = upah.time;
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
    async onConfirm() {
      if (!this.upah) return;

      const auth = getAuth();
      const user = auth.currentUser;

      await addDoc(collection(db, "Request"), {
        upahid: this.upah.id,
        clientid: this.upah.userid,
        helperid: user.uid,
      });

      this.$router.push({ name: "helperactivitypage" });
    },
  },
};
</script>
