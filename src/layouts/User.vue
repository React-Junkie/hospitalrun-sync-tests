<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn icon="home" to="/"/>
        <q-toolbar-title>
          +{{$user.organization || 'HospitalRun'}}
        </q-toolbar-title>
        <q-btn-dropdown
          v-if="$user.device"
          color="accent"
          icon="settings_applications"
          label="Device"
        >
        <device-info/>
        </q-btn-dropdown>
        <q-btn-dropdown
          v-if="$user.device.databases.length > 0"
          color="accent"
          icon="settings_applications"
          label="Data"
        >
          <database-info/>
        </q-btn-dropdown>
        <q-btn-dropdown
          color="accent"
          icon="people"
          label="User"
        >
          <user-info/>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import DatabaseInfo from 'components/DatabaseInfo'
import UserInfo from 'components/UserInfo'
import DeviceInfo from 'components/DeviceInfo'
export default {
  components: {
    UserInfo,
    DeviceInfo,
    DatabaseInfo
  }
}
</script>
