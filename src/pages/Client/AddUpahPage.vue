<template>
  <q-page class="client-page">
    <q-card flat class="header-content">
      <div class="text-h6 text-medium text-black text-center q-pa-xl">
        ACTIVITY
      </div>
    </q-card>

    <div flat class="my-card q-ma-md">
      <div class="column">
        <div class="text-bold text-body1 q-pb-xs">Title</div>
        <q-input
          outlined
          style="background-color: rgba(0, 0, 0, 0.08)"
          class="q-mb-md"
          v-model="upah.title"
        />
      </div>

      <div class="column">
        <div class="text-bold text-body1 q-pb-xs">Description</div>
        <q-input
          outlined
          type="textarea"
          style="background-color: rgba(0, 0, 0, 0.08)"
          class="q-mb-md"
          v-model="upah.desc"
        />
      </div>

      <div class="column">
        <div class="text-bold text-body1 q-pb-xs">Date</div>
        <q-input filled v-model="upah.date" mask="date" :rules="['date']">
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
        <q-input filled v-model="upah.time" class="q-mb-md">
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
          type="number"
          outlined
          style="background-color: rgba(0, 0, 0, 0.08)"
          class="q-mb-md"
        />
      </div>

      <div class="row justify-between">
        <q-btn class="text-black" rounded color="secondary" label="CANCEL" />
        <q-btn class="text-black" rounded color="secondary" label="POST" />
      </div>
    </div>
  </q-page>
</template>
<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      upah: {
        title: "",
        desc: "",
        date: "",
      },
    };
  },
  created() {
    this.upah.date = dayjs();
    const upah = JSON.parse(this.$route.params?.upah);
    if (!upah) return;

    this.upah = {
      ...upah,
      date: dayjs(upah?.date).format("YYYY/MM/DD"),
      time: dayjs(upah?.date).format("hh.mm a"),
    };
  },
  methods: {},
};
</script>
