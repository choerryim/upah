<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :text="['hey, how are you?']"
        stamp="7 minutes ago"
        sent
        bg-color="secondary"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="['doing fine, how r you?']"
        stamp="4 minutes ago"
        text-color="dark"
        bg-color="grey"
      />
    </div>
  </div>
  <div class="q-pa-md" style="position: fixed; bottom: 5%; width: 100vw">
    <q-input rounded outlined v-model="text" label="Type your message here" />
  </div>
</template>
