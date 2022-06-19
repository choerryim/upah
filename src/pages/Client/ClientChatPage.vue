<template>
  <q-page class="helper-page">
    <q-card flat class="header-card">
      <div class="text-h6 text-medium text-white text-center q-pa-xl">
        MESSAGE
      </div>
    </q-card>
    <chat-card
      class="q-mt-lg"
      username="Rose"
      chat="Hi Christine!"
      time="12:50pm"
    />
  </q-page>
</template>
<script>
import ChatCard from "components/ChatCard.vue";

export default {
  components: {
    ChatCard,
  },
};
</script>
