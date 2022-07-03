<template>
  <q-layout class="helper-page" view="hHh lpR fFf">
    <div class="helper-header"></div>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-primary-8 text-white">
      <q-tabs
        style="height: 5vh"
        v-model="tab"
        dense
        align="justify"
        class="bg-primary text-white shadow-2"
        :breakpoint="0"
      >
        <q-route-tab name="sms" icon="sms" />
        <q-route-tab to="/helper" name="home" icon="home" />
        <q-route-tab to="/helper/activity" name="list" icon="list_alt" />
        <q-route-tab
          :to="{
            name: 'detailsprofilepage',
            params: {
              isOwnProfile: true,
            },
          }"
          name="account"
          icon="account_circle"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>
<script>
export default {
  data() {
    return {
      tab: "home",
    };
  },
};
</script>
