<template>
  <q-page class="client-page">
    <q-card flat class="header-content">
      <div class="text-h6 text-medium text-black text-center q-pa-xl">
        {{ upah.id ? "EDIT UPAH" : "ADD UPAH" }}
      </div>
    </q-card>

    <div flat class="my-card q-ma-md">
      <div class="column">
        <div class="text-bold text-body1 q-pb-xs">Title</div>
        <q-input
          filled
          ref="iTitle"
          :rules="[validation.required]"
          outlined
          v-model="upah.title"
        />
      </div>

      <div class="column">
        <div class="text-bold text-body1 q-pb-xs">Description</div>
        <q-input
          filled
          ref="iDesc"
          :rules="[validation.required]"
          outlined
          type="textarea"
          v-model="upah.desc"
        />
      </div>

      <div class="column">
        <div class="text-bold text-body1 q-pb-xs">Date</div>
        <q-input
          ref="iDate"
          filled
          v-model="upah.date"
          @blur="onBlurDate"
          mask="date"
          :rules="[validation.required]"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="upah.date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="column">
        <div class="text-bold text-body1 q-pb-xs">Time</div>
        <q-input
          ref="iTime"
          @blur="onBlurTime"
          filled
          :rules="[validation.required, validation.time]"
          v-model="upah.time"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="upah.time" mask="hh:mm a">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="column">
        <div class="text-bold text-body1 q-pb-xs">Offer (RM)</div>
        <q-input
          filled
          ref="iOffer"
          :rules="[validation.required]"
          type="number"
          v-model="upah.price"
          @blur="onBlurOffer"
          outlined
        />
      </div>

      <div class="row justify-between q-mt-xs">
        <q-btn
          class="text-black"
          rounded
          color="secondary"
          label="CANCEL"
          @click="onClickCancel"
        />
        <q-btn
          class="text-black"
          rounded
          color="secondary"
          label="POST"
          @click="onClickPost"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
import dayjs from "dayjs";
import { getAuth } from "firebase/auth";
import customFormat from "dayjs/plugin/customParseFormat";
import { forEach } from "lodash";
import { doc, updateDoc, setDoc, collection } from "firebase/firestore";
import { db } from "src/boot/firebase";
import { useQuasar, QSpinnerFacebook } from "quasar";

export default {
  data() {
    return {
      $q: null,
      upah: {
        title: "",
        desc: "",
        date: "",
        time: "",
      },
      validation: {
        required: (val) => {
          return !!val || "Field must not be empty!";
        },
        time: (val) => {
          const formatted = dayjs(val, "hh.mm a");

          return (
            formatted.isValid() || "Time format must be valid! e.g 12.30 pm"
          );
        },
      },
    };
  },
  computed: {},
  created() {
    this.$q = useQuasar();
    dayjs.extend(customFormat);
    this.upah.date = dayjs();

    if (!this.$route.params?.upah) return;

    const upah = JSON.parse(this.$route.params?.upah);

    this.upah = {
      ...upah,
      date: dayjs(upah?.date).format("YYYY/MM/DD"),
      time: dayjs(upah?.date).format("hh.mm a"),
    };
  },
  methods: {
    onClickCancel() {
      this.$router.push({
        name: "clientpage",
      });
    },
    async onClickPost() {
      let hasError = false;

      forEach(this.$refs, (inputRef) => {
        inputRef.validate();
        hasError = inputRef.hasError || hasError;
      });

      if (hasError) return;

      this.showLoading("updating...");

      try {
        if (!!this.upah.id) {
          await this.updateUpah();
        } else {
          await this.addNewUpah();
        }

        this.$q.notify({
          icon: "done",
          color: "positive",
          message: "Updated new upah!",
        });
      } catch (error) {
        this.$q.notify({
          color: "negative",
          message: error.message,
        });
      }

      this.$q.loading.hide();

      this.$router.push({ name: "clientpage" });
    },
    async addNewUpah() {
      const auth = getAuth();
      const user = auth.currentUser;

      let upah = this.upah;
      delete upah.id;

      const upahRef = doc(collection(db, "Upah"));
      await setDoc(upahRef, {
        ...upah,
        userid: user.uid,
      });
    },
    async updateUpah() {
      let upah = this.upah;
      const upahRef = doc(db, "Upah", this.upah.id);

      // need to delete id before pushing to database because id is the docs id
      delete upah.id;
      await updateDoc(upahRef, upah);
    },
    onBlurOffer() {
      this.upah.price = Math.abs(this.upah.price);
    },
    onBlurDate() {
      let date = dayjs(this.upah.date, "YYYY/MM/DD");
      date = date.isValid ? date : dayjs();
      this.upah.date = date.format("YYYY/MM/DD");
    },
    onBlurTime() {
      const formatted = dayjs(this.upah.time, "hh.mm a");
      if (!formatted.isValid()) return;

      this.upah.time = formatted.format("hh.mm a");
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
