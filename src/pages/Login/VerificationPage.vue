<template>
  <q-page class="editprofile-page">
    <input
      ref="input_image"
      type="file"
      accept="image/*"
      multiple
      style="display: none"
      @change="updateImage"
    />

    <q-card flat class="header-content">
      <div
        style="font-size: 6vw"
        class="text-h6 text-medium text-white text-center q-pa-xl"
      >
        VERIFICATION
      </div>
    </q-card>
    <div class="editprofile-body">
      <q-scroll-area class="scrollarea">
        <div class="container">
          <div class="input">
            <div class="text text-weight-bold">
              Identification Card / Passport Number
            </div>
            <q-input
              ref="iIC"
              :rules="[validation.required]"
              v-model="input.ic"
              class="input"
              filled
              :dense="true"
            />
          </div>

          <div class="input">
            <div class="text text-weight-bold">Home Address</div>
            <q-input
              ref="iAddress"
              :rules="[validation.required]"
              v-model="input.address"
              class="input"
              type="textarea"
              filled
              :dense="true"
            />
          </div>

          <div class="input">
            <div class="text text-weight-bold">
              Identification Card (back / front)
            </div>
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
            <div v-if="showErrorDocs" class="text-red">
              The picture docs must have a minimum of 2!
            </div>
          </div>
        </div>
        <div class="flex flex-center q-mt-lg">
          <q-btn
            rounded
            color="primary"
            label="Submit Document"
            @click="onClickSubmit"
            style="width: 50vw"
          />
          <q-btn
            class="q-mt-md"
            rounded
            color="primary"
            label="Cancel"
            @click="onClickCancel"
            style="width: 50vw"
          />
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>
<script>
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
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
import { forEach } from "lodash";

export default {
  components: {},
  data() {
    return {
      user: {},
      currentprofileurl: "",
      currentuser: "",
      input: {
        ic: "",
        address: "",
      },
      showErrorDocs: false,
      validation: {
        required: (val) => {
          return !!val || "Field must not be empty!";
        },
      },
      profileImage: "",
      imageFiles: [],
      $q: null,
    };
  },
  async created() {},
  methods: {
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
        name: this.$route.params.from,
        params: { isOwnProfile: true },
      });
    },
    async onClickSubmit() {
      const iIC = this.$refs["iIC"];
      const iAddress = this.$refs["iAddress"];

      iIC.validate();
      iAddress.validate();

      let hasError = iIC.hasError || iAddress.hasError;

      if (this.imageFiles.length < 2) {
        hasError = true;
        this.showErrorDocs = true;
      } else {
        this.showErrorDocs = false;
      }

      if (hasError) return;

      this.showLoading("uploading");

      const auth = getAuth();
      const user = auth.currentUser;

      // Add a new document with a generated id.
      await addDoc(collection(db, "Verification"), {
        userid: user.uid,
        address: this.input.address,
        icnumber: this.input.ic,
      });

      // uploadHighlightImage(this.imageFiles || [], auth.currentUser.uid);

      this.$q.loading.hide();
      this.$q.notify({
        icon: "done",
        color: "positive",
        message: "Profile updated",
      });
      this.$router.push({
        name: this.$route.params.from,
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

      if (this.imageFiles.length > 2) {
        this.imageFiles = this.imageFiles.slice(-2);
      }
    },
    onClickAddImage() {
      this.$refs["input_image"].click();
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
