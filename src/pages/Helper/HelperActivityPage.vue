<template>
  <q-page class="helper-page">
    <q-card flat class="header-content">
      <div class="text-h6 text-medium text-white text-center q-pa-xl">
        ACTIVITY
      </div>
    </q-card>

    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="PENDING" label="PENDING" />
      <q-tab name="ACCEPTED" label="ACCEPTED" />
      <q-tab name="REJECTED" label="REJECTED" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="PENDING" class="no-padding">
        <upah-card
          class="upah-container"
          bottomborder
          v-for="upah in upahsRequest"
          :key="upah.id"
          :upahdetails="upah"
        />
      </q-tab-panel>

      <q-tab-panel name="ACCEPTED">
        <upah-card
          class="upah-container"
          bottomborder
          v-for="upah in upahsAccept"
          :key="upah.id"
          :upahdetails="upah"
        />
      </q-tab-panel>

      <q-tab-panel name="REJECTED">
        <upah-card
          class="upah-container"
          bottomborder
          v-for="upah in upahsReject"
          :key="upah.id"
          :upahdetails="upah"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>
<script>
import UpahCard from "components/UpahCard.vue";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "src/boot/firebase";
import { getAuth } from "firebase/auth";

export default {
  components: {
    UpahCard,
  },
  data() {
    return {
      tab: "PENDING",
      user: {},
      upahsRequest: [],
      upahsAccept: [],
      upahsReject: [],
    };
  },
  async created() {
    const auth = getAuth();
    this.user = auth.currentUser;
    await this.getRequest();
    await this.getAccepted();
    await this.getRejected();
  },
  methods: {
    async getRequest() {
      const q = query(
        collection(db, "Request"),
        where("helperid", "==", this.user?.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (requestdocSnap) => {
        const docRef = doc(db, "Upah", requestdocSnap.data().upahid);
        getDoc(docRef).then((docSnap) => {
          const data = docSnap.data();
          const upah = {
            ...data,
            id: docSnap.id,
            requestid: requestdocSnap.id,
          };

          this.upahsRequest.push(upah);
        });
      });
    },
    async getAccepted() {
      const q = query(
        collection(db, "Accepted"),
        where("helperid", "==", this.user?.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (acceptdocSnap) => {
        const docRef = doc(db, "Upah", acceptdocSnap.data().upahid);
        getDoc(docRef).then((docSnap) => {
          const data = docSnap.data();
          const upah = {
            ...data,
            id: docSnap.id,
            acceptid: acceptdocSnap.id,
          };

          this.upahsAccept.push(upah);
        });
      });
    },
    async getRejected() {
      const q = query(
        collection(db, "Rejected"),
        where("helperid", "==", this.user?.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (rejectdocSnap) => {
        const docRef = doc(db, "Upah", rejectdocSnap.data().upahid);
        getDoc(docRef).then((docSnap) => {
          const data = docSnap.data();
          const upah = {
            ...data,
            id: docSnap.id,
            rejectid: rejectdocSnap.id,
          };

          this.upahsReject.push(upah);
        });
      });
    },
  },
};
</script>
<style scoped>
.no-padding {
  padding: 0 !important;
}
</style>
