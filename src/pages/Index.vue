<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 600px">
      Welcome{{$user.name ? " back" : ""}}! {{$user.name}}
      <registrations v-if="Object.keys($user.device.registrations).length > 0"/>
    </div>
  </q-page>
</template>
<script>
import Registrations from 'components/Registrations'
export default {
  components: {
    Registrations
  }
}
</script>
