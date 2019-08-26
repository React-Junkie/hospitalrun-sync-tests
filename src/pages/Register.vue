<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 850px">
      <register></register>
    </div>
  </q-page>
</template>
<script>
import Register from 'components/RegisterForm'
export default {
  name: 'RegistrationPage',
  components: {
    Register
  }
}
</script>
