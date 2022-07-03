<template>
  <q-card flat bordered class="upah-card q-mx-none">
    <q-card-section class="row">
      <div class="col-2">
        <q-avatar>
          <img :src="profilepictureurl" />
        </q-avatar>
      </div>

      <div class="col">
        <div class="text-body1 text-bold">
          {{ friendName || "Missing username" }}
        </div>
        <div class="text-body2 q-pt-xs">
          {{ lastChat }}
        </div>
      </div>
      <!-- <div class="col-2">
        <div class="text-body2">{{ time }}</div>
      </div> -->
    </q-card-section>
  </q-card>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "src/boot/firebase";
import { getProfilePictureURL } from "src/scripts/firebase-helper";

export default {
  props: {
    chatDetails: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      friendName: "",
      lastChat: "",
      profilepictureurl: "",
    };
  },
  async mounted() {
    this.getLastMessage();
    await this.getFriendName();
  },
  methods: {
    getLastMessage() {
      const messages = this.chatDetails?.messages;
      this.lastChat = messages?.at(-1).content;
    },
    async getFriendName() {
      const auth = getAuth();
      const user = auth.currentUser;

      const friendId = this.chatDetails?.chatters?.filter((item) => {
        return item !== user.uid;
      })?.[0];

      this.profilepictureurl = await getProfilePictureURL(friendId);

      const docRef = doc(db, "User", friendId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.friendName = docSnap.data().username;
      }
    },
  },
};
</script>
