<template>
  <div style="height: 100vh; display: flex; flex-direction: column">
    <div
      class="bg-secondary"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 10vh;
      "
    >
      <q-icon
        class="accept-text q-mr-md"
        name="arrow_back_ios"
        size="md"
        @click="onClickBack"
        style="position: absolute; left: 10%"
      />
      <div class="text-h6 text-medium text-black text-center">
        {{ friendName }}
      </div>
    </div>
    <q-scroll-area
      ref="scroll"
      class="q-mt-md q-mx-sm"
      style="display: flex; flex-direction: column; flex: 1 1"
    >
      <q-chat-message
        v-for="message in messages"
        :key="message"
        :name="this.currentuserid === message.uid ? 'Me' : friendName"
        :avatar="
          this.currentuserid === message.uid ? currentuserurl : friendurl
        "
        :text="[message.content]"
        :sent="this.currentuserid === message.uid"
        :text-color="this.currentuserid === message.uid ? 'dark' : 'white'"
        :bg-color="this.currentuserid === message.uid ? 'secondary' : 'grey'"
      />
    </q-scroll-area>
    <div class="q-pa-md">
      <q-input
        color="secondary"
        rounded
        outlined
        v-model="text"
        placeholder="Type your message here"
      >
        <template v-slot:append>
          <q-icon
            name="send"
            @click="onClickSend"
            class="cursor-pointer text-grey"
          />
        </template>
      </q-input>
    </div>
  </div>
</template>
<script>
import { getAuth } from "firebase/auth";
import { onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "src/boot/firebase";
import { getProfilePictureURL } from "src/scripts/firebase-helper";

export default {
  data() {
    return {
      text: "",
      currentuserid: "",
      messages: [],
      friendName: "",
      currentuserurl: "",
      friendurl: "",
    };
  },
  created() {
    this.friendName = this.$route.params.friendName;
    this.getCurrentUser();
    this.getMessages();
  },
  mounted() {
    this.$refs.scroll?.setScrollPosition("vertical", 9999999);
  },
  methods: {
    onClickBack() {
      const prevPath = this.$router.options.history.state.back;

      console.log();
      this.$router.push({
        name: prevPath.includes("/client")
          ? "clientchatpage"
          : "helperchatpage",
      });
    },
    async getCurrentUser() {
      const auth = getAuth();
      const user = auth.currentUser;

      this.currentuserid = user.uid;
      this.currentuserurl = await getProfilePictureURL();
    },
    getMessages() {
      const q = doc(db, "Chats", this.$route.params.chatid);
      const unsub = onSnapshot(q, async (doc) => {
        this.messages = doc.data().messages;

        if (!this.friendurl || this.friendurl === "") {
          const friendid = doc.data().chatters.filter((item) => {
            return item !== this.currentuserid;
          })?.[0];

          this.friendurl = await getProfilePictureURL(
            friendid || "some random id"
          );
        }
      });
    },
    async onClickSend() {
      if (!this.text) return;

      const washingtonRef = doc(db, "Chats", this.$route.params.chatid);

      // Atomically add a new region to the "regions" array field.
      await updateDoc(washingtonRef, {
        messages: arrayUnion({
          content: this.text,
          uid: this.currentuserid,
        }),
      });

      this.$refs.scroll?.setScrollPosition("vertical", 9999999);
      this.text = null;
    },
  },
};
</script>
