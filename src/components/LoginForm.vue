<template>
  <div>
    Login to our magic service!
    <q-input label="Username" v-model="$user.name"></q-input>
    <q-input label="Password" v-model="secret"></q-input>
    <q-btn label="Go Back" v-go-back=" '/' "/>
    <q-btn label="Login" @click="submitLogin"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      secret: ''
    }
  },
  methods: {
    submitLogin: async function (e) {
      await this.$user.loginWithSecret(this.secret)
      this.secret = ''
      this.$router.push('profile')
    }
  }
}
</script>
