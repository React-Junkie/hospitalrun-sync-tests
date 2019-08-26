<template>
  <div class="row no-wrap q-pa-md">
      <div class="column items-center">
        <div class="text-h6 q-mb-md">Databases</div>
        <div v-if="$user.device.databases">
          <q-input v-for="(database, index) in $user.device.databases" v-bind:key="index" :label="`Database_${database.match('keystore').length > 0 ? 'Keystore' : 'Katalog'}`" :value="database" readonly/>
        </div>
      </div>

      <q-separator vertical inset class="q-mx-lg" />

      <div class="column items-center">
        <div class="text-h6 q-mb-md">Keystores</div>
        <q-input v-if="$user.device.keystore" v-model="$user.device.keystore.name" label="Keystores" readonly/>
      </div>
  </div>
</template>
