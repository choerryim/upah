<template>
  <q-page class="client-page">
    <q-card flat class="header-content">
      <div class="text-h6 text-medium text-black text-center q-pa-xl">
        ACTIVITY
      </div>
    </q-card>
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="pending" label="PENDING" />
        <q-tab name="accepted" label="ACCEPTED" />
        <q-tab name="rejected" label="REJECTED" />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="pending" class="no-padding">
          <activity-card
            bottomborder
            v-for="upah in upahsRequest"
            :key="upah.id"
            :upahdetails="upah"
          />
        </q-tab-panel>

        <q-tab-panel name="accepted" class="no-padding">
          <activity-card
            bottomborder
            :accepted="true"
            v-for="upah in upahsAccept"
            :key="upah.id"
            :upahdetails="upah"
          />
        </q-tab-panel>

        <q-tab-panel name="rejected" class="no-padding">
          <activity-card
            :rejected="true"
            bottomborder
            v-for="upah in upahsReject"
            :key="upah.id"
            :upahdetails="upah"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
<script>
import ActivityCard from "components/ActivityCard.vue";
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
    ActivityCard,
  },

  data() {
    return {
      tab: "pending",
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
        where("clientid", "==", this.user?.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (requestdocSnap) => {
        const requestData = requestdocSnap.data();
        const docRef = doc(db, "Upah", requestData.upahid);
        getDoc(docRef).then((docSnap) => {
          const data = docSnap.data();
          const upah = {
            ...data,
            upahid: docSnap.id,
            requestid: requestdocSnap.id,
            helperid: requestData.helperid,
          };
          this.upahsRequest.push(upah);
        });
      });
    },
    async getAccepted() {
      const q = query(
        collection(db, "Accept"),
        where("clientid", "==", this.user?.uid)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (acceptdocSnap) => {
        const acceptData = acceptdocSnap.data();
        const docRef = doc(db, "Upah", acceptData.upahid);
        getDoc(docRef).then((docSnap) => {
          const data = docSnap.data();
          const upah = {
            ...data,
            id: docSnap.id,
            acceptid: acceptdocSnap.id,
            helperid: acceptData.helperid,
          };

          this.upahsAccept.push(upah);
        });
      });
    },
    async getRejected() {
      const q = query(
        collection(db, "Reject"),
        where("clientid", "==", this.user?.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (rejectdocSnap) => {
        const rejectData = acceptdocSnap.data();
        const docRef = doc(db, "Upah", rejectData.upahid);
        getDoc(docRef).then((docSnap) => {
          const data = docSnap.data();
          const upah = {
            ...data,
            id: docSnap.id,
            rejectid: rejectdocSnap.id,
            helperid: rejectData.helperid,
          };

          this.upahsReject.push(upah);
        });
      });
    },
  },
};
</script>
