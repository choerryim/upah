<template>
  <q-page
    class="detailsprofile-page"
    style="display: flex; flex-direction: column"
  >
    <div
      v-if="$route.params?.isOwnProfile"
      class="edit-button"
      @click="onClickEdit"
    >
      <div class="square"></div>
      <q-icon class="pencil" name="edit" size="sm" />
    </div>
    <q-card class="detailsprofile-card">
      <q-card-section>
        <q-card-section class="row justify-center">
          <div class="row col-3">
            <q-avatar style="width: 100%; height: 100%">
              <img :src="profilepictureurl" />
            </q-avatar>
          </div>

          <div class="col">
            <div class="text-body1 text-bold q-pl-md">{{ formattedName }}</div>
            <q-icon
              class="star-text arrow-text q-pl-md"
              name="star"
              size="xs"
            />
            <span class="text-caption q-ml-sm">{{ formatRating }}</span>
            <div class="text-body2 q-pt-xs q-pl-md">
              {{ formattedJoinedDate }}
            </div>
          </div>
        </q-card-section>
      </q-card-section>
      <q-card-section class="text-bold text-body1 q-pb-xs q-pl-xl q-pt-none">
        About Me
      </q-card-section>
      <q-card-section class="text-lightweight text-body2 q-pt-none q-pl-xl">
        {{ user.about || "Hello there :)" }}
      </q-card-section>
    </q-card>

    <q-card-section class="text-bold text-body1"> Reviews </q-card-section>
    <div class="fullcover" style="display: flex; flex: 1 1">
      <q-scroll-area style="flex: 1 1">
        <review-card
          v-for="x in 10"
          :key="x"
          username="Mirooon"
          review="baik pak"
          style="margin-bottom: 0.5rem"
        />
      </q-scroll-area>
    </div>
    <!-- <div
      class="fullcover"
      style="display: flex; flex-direction: column; flex: 1 1"
    >
      No review yet!
    </div> -->
    <q-btn
      v-if="$route.params?.isOwnProfile"
      rounded
      color="red"
      label="Logout"
      class="q-mt-md"
      @click="onClickLogout"
    />
  </q-page>
</template>
<script>
import ReviewCard from "components/ReviewCard.vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/boot/firebase";
import dayjs from "dayjs";
import { getAuth, signOut } from "firebase/auth";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { getProfilePictureURL } from "src/scripts/firebase-helper";

export default {
  components: {
    ReviewCard,
  },
  data() {
    return {
      $q: null,
      user: {},
      currentuser: "",
      profilepictureurl: "",
    };
  },
  async created() {
    this.profilepictureurl = await getProfilePictureURL();
    this.$q = useQuasar();
    const auth = getAuth();
    const currentUser = auth.currentUser;
    this.currentuser = currentUser.uid;
    await this.getUserDetails();
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
  methods: {
    async getUserDetails() {
      const id = this.$route.params?.isOwnProfile
        ? this.currentuser
        : this.$route.params.userid;

      const docRef = doc(db, "User", id);
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
    onClickEdit() {
      this.$router.push({
        name: "usereditprofilepage",
      });
      // this.$router.push({ name: "usereditprofilepage" });
    },
    onClickLogout() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: "primary",
        spinnerSize: 140,
        backgroundColor: "secondary",
        message: "signing out",
        messageColor: "black",
      });

      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Signed out!",
          });
          this.$router.push({ name: "loginpage" });
        })
        .catch((error) => {
          // An error happened.
          this.$q.notify({
            color: "negative",
            message: error.message,
          });
        })
        .finally(() => {
          this.$q.loading.hide();
        });
    },
  },
};
</script>
