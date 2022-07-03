<template>
  <q-card
    flat
    :bordered="!bottomborder"
    class="activity-card"
    :class="{ 'bordered-right': bottomborder }"
  >
    <q-card-section class="row">
      <div class="col-2">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </div>

      <div class="col">
        <div class="row justify-between">
          <div class="text-body1 text-bold">
            {{ username || "Missing Username" }}
          </div>
          <div class="col-4.5">
            <div class="viewprofile-text text-body2">VIEW PROFILE</div>
          </div>
        </div>
        <q-icon class="yellowstar-text arrow-text" name="star" size="xs" />
        <span class="text-caption text-grey q-ml-sm">{{
          upahdetails?.rating || "no rating yet"
        }}</span>
        <div class="text-body2 q-pt-xs">
          Wants to help with: {{ upahdetails?.desc }}
        </div>
        <span class="text-caption text-grey">{{ formattedDate }}</span>
        <div class="row justify-between q-pt-md">
          <!-- CHAT -->
          <q-btn
            rounded
            color="secondary"
            text-color="dark"
            label="CHAT"
            @click="onClickChat"
          />
          <div v-if="!accepted">
            <q-icon
              class="accept-text q-mr-md"
              name="done"
              size="md"
              @click="onClickAccept"
            />
            <q-icon
              class="reject-text"
              name="close"
              size="md"
              @click="onClickAccept"
            />
          </div>
        </div>
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

export default {
  props: {
    bottomborder: {
      type: Boolean,
      default: false,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    rejected: {
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
      const docRef = doc(db, "User", this.upahdetails.helperid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.username = docSnap.data().username;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    async onClickAccept() {
      //       date: "2022/07/21"
      // desc: "my balls balls"
      // helperid: "VaRJJVP2HAQSh1bZ05png0QaR1q1"
      // price: "50"
      // requestid: "X08teRJAh1zfKyIMGgqV"
      // time: "05.03 am"
      // title: "Take care Balls"
      // upahid: "aONXQehdhJAqRsnEdBpE"
      // userid: "Hc9cYk8xz1MJdKc1
      await addDoc(collection(db, "Accept"), {
        upahid: this.upahdetails.upahid,
        clientid: this.upahdetails.userid,
        helperid: this.upahdetails.helperid,
      });

      await deleteDoc(doc(db, "Request", this.upahdetails.requestid));
    },
    async onClickReject() {
      await addDoc(collection(db, "Reject"), {
        upahid: this.upahdetails.upahid,
        clientid: this.upahdetails.userid,
        helperid: this.upahdetails.helperid,
      });

      await deleteDoc(doc(db, "Request", this.upahdetails.requestid));
    },
    async onClickChat() {
      await this.getChats();
    },
    async getChats() {
      //  console.log(this.upahdetails);
      //       acceptid: "8mC3COGXEBq2hR0SX2vX"
      // date: "2022/07/21"
      // desc: "my balls balls"
      // helperid: "VaRJJVP2HAQSh1bZ05png0QaR1q1"
      // id: "aONXQehdhJAqRsnEdBpE"
      // price: "50"
      // time: "05.03 am"
      // title: "Take care Balls"
      // userid: "Hc9cYk8xz1MJdKc1lpW0VKdF9ms1"

      const userid = this.upahdetails.userid;

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

      const friendid = this.upahdetails.helperid;
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
