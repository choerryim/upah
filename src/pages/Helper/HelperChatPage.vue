<template>
  <q-page class="helper-page">
    <q-card flat class="header-content">
      <div class="text-h6 text-medium text-white text-center q-pa-xl">
        MESSAGE
      </div>
    </q-card>
    <chat-card
      v-for="chat in chats"
      :key="chat.chatid"
      :chatDetails="chat"
      @click="onClickGoToChat(chat.chatid, chat.chatters)"
    />
  </q-page>
</template>
<script>
import ChatCard from "components/ChatCard.vue";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "src/boot/firebase";

export default {
  components: {
    ChatCard,
  },
  data() {
    return {
      chats: [],
      userid: "",
    };
  },
  async created() {
    await this.getChats();
  },
  methods: {
    async getChats() {
      const auth = getAuth();
      const user = auth.currentUser;

      this.userid = user.uid;

      const q = query(
        collection(db, "Chats"),
        where("chatters", "array-contains", user.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let chat = {
          ...doc.data(),
          chatid: doc.id,
        };
        this.chats.push(chat);
      });
    },
    async onClickGoToChat(chatid, chatters) {
      const friendid = chatters?.filter((item) => {
        return item !== this.userid;
      })?.[0];

      const friendName = await this.getFriendName(friendid);
      this.$router.push({
        name: "chatpage",
        params: { chatid, friendName, backTo: "clientchatpage" },
      });
    },
    async getFriendName(friendid) {
      const docRef = doc(db, "User", friendid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data().username;
      }
    },
  },
};
</script>
