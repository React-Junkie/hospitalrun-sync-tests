<template>
  <div flex>
    Register for our magic service!
    <q-input v-model="username" label="Username"></q-input>
    <q-input v-model="secret" label="Password"></q-input>
    <q-input v-model="organization" label="Organization"></q-input>
    <q-btn label="Go Back" v-go-back=" '/' "/>
    <q-btn label="Register" @click="submitRegistration"/>
    <q-dialog v-model="hasError" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="error_outline" color="primary" text-color="white" />
          <span class="q-ml-sm">{{errMsg}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Login" color="primary" to="login" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      organization: null,
      username: null,
      secret: null,
      hasError: false,
      errMsg: ''
    }
  },
  methods: {

    async submitRegistration (e) {
      try {
        await this.$user.register({
          name: this.username,
          secret: this.secret,
          organization: this.organization || 'HospitalRun'
        })
        this.$user.lastUser = this.$user.name
        this.$router.push('profile')
      } catch (err) {
        console.log(err.name)
        this.hasError = true
        if (err.name === 'UserExists') {
          this.errMsg = 'User Already Exists at this Organization Location'
        }
      }
    }
  }
}
</script>
