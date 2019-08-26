<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 600px">
      <login></login>
    </div>
  </q-page>
</template>
<script>
import Login from 'components/LoginForm'
export default {
  name: 'LoginPage',
  components: {
    Login
  }
}
</script>
