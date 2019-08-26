<template>
  <div width="600px" class="col-auto row q-pa-md">
    <div class="column flex items-center">
      <div class="text-h6 q-mb-md">User Information</div>
      <q-avatar v-if="$user.name" size="72px">
        <img src="https://pbs.twimg.com/profile_images/495217661744132096/Z3HB57vL.png">
      </q-avatar>
      <div v-if="$user.name" class="text-subtitle1 q-mt-md q-mb-xs">{{$user.name}}</div>
      <div class="row items-center">
        <q-btn
          v-if="$user.name"
          color="primary"
          label="Logout"
          push
          size="sm"
          @click="$user.logout()"
          v-close-popup
        />
        <q-btn
          v-if="!$user.name"
          color="primary"
          label="Log-in"
          push
          size="xs"
          to="login"
          v-close-popup
        />
        <q-btn
          v-if="!$user.name"
          color="primary"
          label="Register"
          push
          size="xs"
          to="register"
          v-close-popup
        />
      </div>
      <div v-if="$user.id" >
        <q-input v-model="$user.id" label="User ID" readonly/>
        <q-input v-model="$user.rev" label="User Revision" readonly/>
        <q-input v-model="$user.meta.firstName" label="First Name"/>
        <q-input v-model="$user.meta.lastName" label="Last Name"/>
      </div>

      <!--this.meta = {-->
      <!--firstName: null,-->
      <!--lastName: null,-->
      <!--registrations: {},-->
      <!--organizations: {},-->
      <!--devices: {},-->
      <!--catalogs: {},-->
      <!--keystores: {}-->
      <!--}-->
    </div>
  </div>
</template>
<style>
  .q-menu {
    max-width: 600px !important;
  }
</style>
