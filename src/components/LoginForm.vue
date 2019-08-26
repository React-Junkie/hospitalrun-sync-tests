<template>
  <div>
    Login to our magic service!
    <q-input label="Username" v-model="$user.name"></q-input>
    <q-input label="Password" v-model="secret"></q-input>
    <q-input label="Organization" v-model="$user.organization" placeholder="HospitalRun"></q-input>
    <q-btn label="Go Back" v-go-back=" '/' "/>
    <q-btn label="Login" @click="submitLogin"/>
    <q-dialog v-model="hasError" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="error_outline" color="primary" text-color="white" />
          <span class="q-ml-sm">{{errMsg}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Register" color="primary" to="register" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      secret: '',
      hasError: false,
      errMsg: ''
    }
  },
  methods: {
    submitLogin: async function (e) {
      try {
        await this.$user.loginWithSecret(this.secret)
        this.secret = ''
        this.$router.push('profile')
      } catch (err) {
        console.log(err.name)
        this.hasError = true
        if (err.name === 'NotRegistered') {
          this.errMsg = 'User is not registered at this Organization Location'
        }
      }
    }
  }
}
</script>
