<template>
  <div flex>
    Register for our magic service!
    <q-input v-model="username" label="Username"></q-input>
    <q-input v-model="secret" label="Password"></q-input>
    <q-input v-model="organization" label="Organization"></q-input>
    <q-btn label="Go Back" v-go-back=" '/' "/>
    <q-btn label="Register" @click="submitRegistration"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      organization: null,
      username: null,
      secret: null
    }
  },
  methods: {
    async submitRegistration (e) {
      await this.$user.register({
        name: this.username,
        secret: this.secret,
        organization: this.organization || 'HospitalRun'
      })
      this.$user.lastUser = this.$user.name
      this.$router.push('profile')
    }
  }
}
</script>
