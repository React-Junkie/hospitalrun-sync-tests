<template>
  <div class="row no-wrap q-pa-md">
    <div class="column">
      <div class="text-h6 q-mb-md">Device Information</div>
      <q-input v-model="$user.device.id" label="Device  ID" readonly/>
      <q-input v-model="Object.keys($user.device.registrations).length" label="Device Users" readonly/>
    </div>
  </div>
</template>
