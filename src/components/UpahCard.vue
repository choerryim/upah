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
          <img :src="profilepictureurl" />
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

        <q-btn
          v-if="showchat"
          class="q-mt-sm"
          rounded
          color="primary"
          text-color="dark"
          label="CHAT"
          @click="onClickChat"
        />
      </div>

      <div class="col-2">
        <div class="price-text text-h6">RM{{ upahdetails?.price }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {
  doc,
  getDoc,
  deleteDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import customFormat from "dayjs/plugin/customParseFormat";
import { db } from "src/boot/firebase";
import dayjs from "dayjs";
import { getProfilePictureURL } from "src/scripts/firebase-helper";

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
    showchat: {
      type: Boolean,
      default: false,
    },
  },
  async created() {
    this.profilepictureurl = await getProfilePictureURL(
      this.upahdetails.userid
    );
    dayjs.extend(customFormat);
    await this.getUsername();
  },
  data() {
    return {
      username: "",
      profilepictureurl: "",
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
    async onClickChat() {
      console.log(this.upahdetails);
      const userid = this.upahdetails.helperid;

      const q = query(
        collection(db, "Chats"),
        where("chatters", "array-contains", userid)
      );
      const querySnapshot = await getDocs(q);
      const chats = [];
      querySnapshot.forEach((doc) => {
        let chat = {
          ...doc.data(),
          chatid: doc.id,
        };
        chats.push(chat);
      });

      const friendid = this.upahdetails.userid;
      const current_chat = chats.filter((item) => {
        return item.chatters.includes(friendid);
      })?.[0];

      if (current_chat) {
        this.$router.push({
          name: "chatpage",
          params: { chatid: current_chat.chatid, friendName: this.username },
        });
      } else {
        await this.createChat(userid, friendid);
      }
    },
    async createChat(userid, friendid) {
      // Add a new document with a generated id
      const chatRef = doc(collection(db, "Chats"));

      // later...
      const docRef = await setDoc(chatRef, {
        chatters: [userid, friendid],
        messages: [],
      });

      this.$router.push({
        name: "chatpage",
        params: { chatid: docRef.id, friendName: this.username },
      });
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
