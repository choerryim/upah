<template>
  <q-layout class="client-page" view="hHh lpR fFf">
    <div class="client-header"></div>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-secondary text-grey">
      <q-tabs
        style="height: 5vh"
        v-model="tab"
        dense
        align="justify"
        class="bg-secondary text-grey shadow-2"
        :breakpoint="0"
      >
        <q-route-tab to="/client/clientchat" name="sms" icon="sms" />
        <q-route-tab to="/client/addupah" name="add" icon="add_box" />
        <q-route-tab to="/client" name="home" icon="home" />
        <q-route-tab to="/client/clientactivity" name="list" icon="list_alt" />
        <q-route-tab
          :to="{
            name: 'clientprofilepage',
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
