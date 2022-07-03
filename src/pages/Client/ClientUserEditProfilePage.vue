<template>
  <q-page class="editprofile-page">
    <div v-if="currentuser?.uid === user?.id" class="edit-button">
      <div class="square"></div>
      <q-icon class="pencil hidethis text-secondary" name="edit" size="sm" />
    </div>
    <div class="save-button" @click="onClickSave">
      <div class="text-white text-weight-medium" style="font-size: 3.5vw">
        SAVE
      </div>
    </div>
    <div class="cancel-button" @click="onClickCancel">
      <div class="text-white text-weight-medium" style="font-size: 3.5vw">
        CANCEL
      </div>
    </div>
    <input
      ref="input_image"
      type="file"
      accept="image/*"
      multiple
      style="display: none"
      @change="updateImage"
    />
    <input
      ref="input_profile_image"
      type="file"
      accept="image/*"
      style="display: none"
      @change="updateProfileImage"
    />

    <q-card flat class="header-content">
      <div
        style="font-size: 6vw"
        class="text-h6 text-medium text-white text-center q-pa-xl"
      >
        EDIT PROFILE
      </div>
    </q-card>
    <div class="editprofile-body">
      <q-scroll-area class="scrollarea">
        <div class="container">
          <div class="profilepicture">
            <q-avatar size="30vw">
              <img :src="profileImage?.url ?? ''" />
            </q-avatar>
            <div class="change-picture" @click="changeProfilePicture">
              <q-icon class="camera" size="6vw" name="photo_camera" />
            </div>
          </div>

          <div class="input">
            <div class="text text-weight-bold">Name</div>
            <q-input
              v-model="input.username"
              class="input"
              filled
              :dense="true"
            />
          </div>

          <div class="input">
            <div class="text text-weight-bold">About</div>
            <q-input
              v-model="input.about"
              class="input"
              type="textarea"
              filled
              :dense="true"
            />
          </div>

          <div class="input">
            <div class="text text-weight-bold">Photos</div>
            <q-scroll-area class="scrollarea">
              <div class="add-photo">
                <div
                  class="highlight-photo-container"
                  v-for="image in imageFiles"
                  :key="image.file.name"
                >
                  <q-img
                    :src="image.url"
                    spinner-color="white"
                    class="highlight-photo"
                  />

                  <q-icon
                    class="delete-photo-button"
                    name="delete"
                    size="2rem"
                    @click="removeImage(image.file.name)"
                  />
                </div>

                <q-icon
                  class="add-photo-button"
                  name="add"
                  size="3rem"
                  @click="onClickAddImage"
                />
              </div>
            </q-scroll-area>
            <div class=""></div>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>
<script>
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "src/boot/firebase";
import dayjs from "dayjs";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getProfilePicture,
  uploadHighlightImage,
  fetchHighlightImage,
} from "src/scripts/firebase-helper";
import { useQuasar, QSpinnerFacebook } from "quasar";

export default {
  components: {},
  data() {
    return {
      user: {},
      currentprofileurl: "",
      currentuser: "",
      input: {
        username: "",
        about: "",
      },
      profileImage: "",
      imageFiles: [],
      $q: null,
    };
  },
  async created() {
    this.$q = useQuasar();
    this.showLoading("fetching data...");
    await this.setupHighlightImage();
    const picture_file = await getProfilePicture();
    this.profileImage = {
      file: picture_file,
      url: URL.createObjectURL(picture_file),
    };

    const auth = getAuth();
    const user = auth.currentUser;
    this.currentuser = user.uid;
    await this.getUserDetails();
    this.$q.loading.hide();
  },
  methods: {
    async setupHighlightImage() {
      const highlightImages = await fetchHighlightImage();
      if (!highlightImages?.length) {
        return;
      }
      this.updateImage(highlightImages);
    },
    async getUserDetails() {
      const docRef = doc(db, "User", this.currentuser);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        this.user = {
          ...data,
          register_date: data.register_date.toDate(),
        };

        this.input.username = this.user.username;
        this.input.about = this.user.about;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    onClickCancel() {
      this.$router.push({
        name: "clientprofilepage",
        params: { isOwnProfile: true },
      });
    },
    async onClickSave() {
      this.showLoading("registering");

      if (this.profileImage.file) {
        const storage = getStorage();
        const path = `UserProfilePicture/profile-${this.currentuser}`;
        const storageRef = ref(storage, path);
        uploadBytes(storageRef, this.profileImage.file).then((snapshot) => {});
      }

      const auth = getAuth();
      const userRef = doc(db, "User", auth.currentUser.uid);
      updateProfile(auth.currentUser, {
        displayName: this.input.username,
      })
        .then(async () => {})
        .catch((error) => {})
        .finally(() => {});

      await updateDoc(userRef, {
        about: this.input.about,
        username: this.input.username,
      });

      uploadHighlightImage(this.imageFiles || [], auth.currentUser.uid);

      this.$q.loading.hide();
      this.$q.notify({
        icon: "done",
        color: "positive",
        message: "Profile updated",
      });
      this.$router.push({
        name: "clientprofilepage",
        params: { isOwnProfile: true },
      });
    },
    updateImage(files) {
      if (!files || !Array.isArray(files)) {
        files = this.$refs["input_image"].files;
      }

      if (files.length === 0) {
        return;
      }

      for (const file of files) {
        if (
          this.imageFiles.filter((item) => item.name === file.name).length > 0
        )
          continue;
        this.imageFiles.push({
          file: file,
          url: URL.createObjectURL(file),
        });
      }
    },
    onClickAddImage() {
      this.$refs["input_image"].click();
    },
    changeProfilePicture() {
      this.$refs["input_profile_image"].click();
    },
    updateProfileImage() {
      const file = this.$refs["input_profile_image"].files?.[0];
      if (!file) return;

      this.profileImage = {
        file: file,
        url: URL.createObjectURL(file),
      };
    },
    removeImage(name) {
      const res = this.imageFiles.filter((item) => {
        return item.file.name !== name;
      });

      this.imageFiles = res;
    },
    showLoading(text) {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: "primary",
        spinnerSize: 140,
        backgroundColor: "secondary",
        message: text,
        messageColor: "black",
      });
    },
  },
};
</script>
