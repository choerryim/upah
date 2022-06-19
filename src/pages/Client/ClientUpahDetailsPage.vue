<template>
  <q-page>
    <q-card flat class="header-content row">
      <q-card-section class="row justify-center items-center">
        <div class="row col-4">
          <q-avatar style="width: 90%; height: auto">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </div>

        <div class="col text-black">
          <div class="text-body1 text-bold">Name</div>
          <q-icon class="star-text arrow-text" name="star" size="xs" />
          <span class="text-caption q-ml-sm">5.0 (3)</span>
          <div class="text-body2 q-pt-xs">Joined 2020</div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat class="my-card q-ma-xl">
      <q-card-section class="text-bold text-body1 q-pb-xs">
        Title
      </q-card-section>
      <q-card-section class="text-lightweight text-body2 q-pt-none">
        Help me with babysitting my kid for 2 hours
      </q-card-section>

      <q-card-section class="text-bold text-body1 q-pb-xs">
        Description
      </q-card-section>
      <q-card-section class="text-lightweight text-body2 q-pt-none">
        I will have a meeting during the mentioned date and time for 2 hours. I
        would need a help for you to watch my kid while I am at work.
      </q-card-section>

      <q-card-section class="text-bold text-body1 q-pb-xs">
        Date
      </q-card-section>
      <q-card-section class="text-lightweight text-body2 q-pt-none">
        25-10-2022
      </q-card-section>

      <q-card-section class="text-bold text-body1 q-pb-xs">
        Time
      </q-card-section>
      <q-card-section class="text-lightweight text-body2 q-pt-none">
        2pm-4pm
      </q-card-section>

      <q-card-section class="text-bold text-body1 q-pb-xs">
        Offer
      </q-card-section>
      <q-card-section class="text-lightweight text-body2 q-pt-none">
        RM50
      </q-card-section>
      <q-card-section class="flex flex-center">
        <q-btn rounded color="secondary" text-color="dark" label="EDIT" />
      </q-card-section>
    </q-card>
  </q-page>
</template>
