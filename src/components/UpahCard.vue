<template>
  <q-card
    flat
    :bordered="!bottomborder"
    class="upah-card"
    :class="{ 'bordered-right': bottomborder }"
  >
    <q-card-section class="row">
      <div class="col-2 q-mr-md">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </div>

      <div class="col">
        <div class="text-body1 text-bold">
          {{ username || "Missing Username" }}
        </div>
        <q-icon class="star-text arrow-text" name="star" size="xs" />
        <span class="text-caption text-grey q-ml-sm">
          {{ upahdetails?.rating }}</span
        >
        <div class="text-body2 q-pt-xs">
          {{ upahdetails?.title }}
        </div>
        <span class="text-caption text-grey">{{ formattedDate }}</span>
      </div>

      <div class="col-2">
        <div class="price-text text-h6">RM{{ upahdetails?.price }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import customFormat from "dayjs/plugin/customParseFormat";
import { db } from "src/boot/firebase";
import dayjs from "dayjs";

export default {
  props: {
    bottomborder: {
      type: Boolean,
      default: false,
    },
    upahdetails: {
      type: Object,
      require: true,
    },
  },
  async created() {
    dayjs.extend(customFormat);
    await this.getUsername();
  },
  data() {
    return {
      username: "",
    };
  },
  computed: {
    formattedDate() {
      const date = `${this.upahdetails?.date} ${this.upahdetails?.time}`;
      return dayjs(date, "YYYY/MM/DD hh.mm a").format(
        "DD.MM.YYYY dddd hh.mm a"
      );
    },
  },
  methods: {
    async getUsername() {
      if (!this.upahdetails) return;
      const docRef = doc(db, "User", this.upahdetails.userid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.username = docSnap.data().username;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
  },
};
</script>

<style scoped>
.bordered-right {
  border-bottom: 0.5px solid hsla(0, 0%, 0%, 0.315);
  border-radius: 0;
}
</style>
