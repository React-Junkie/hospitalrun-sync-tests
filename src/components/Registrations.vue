<template>
  <div>
  <div v-if="Object.keys($user.device.registrations).length > 0">

    <!--For All Organization Devices-->
    <div
      v-for="(devices, organization) in $user.device.registrations"
      v-bind:key="organization"
    >
      <!--List Organization Expander-->
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          icon="business"
          :label="organization"
          header-class="bg-primary text-white"
        >
          <!--Organization Details-->
          <q-card>
            <q-card-section>
              <q-list>
                <q-expansion-item
                  v-for="(users, device) in devices"
                  v-bind:key="device"
                  expand-separator
                  icon="map"
                  :label="device === $user.device.id ? 'Current Location' : device"
                  header-class="bg-primary text-white"
                >
                  <q-card class="bg-accent">
                    <q-card-section>
                      <q-list>
                        <q-expansion-item
                          v-for="(paths, user) in users"
                          v-bind:key="user"
                          expand-separator
                          icon="people"
                          :label="user"
                          header-class="bg-primary text-white"
                        >
                          <q-card class="bg-accent">
                            <q-card-section>
                              <q-input
                                v-for="(path, index) in paths"
                                v-bind:key="index"
                                :label="index"
                                :value="path"
                                readonly
                              />
                            </q-card-section>
                          </q-card>
                        </q-expansion-item>
                      </q-list>
                    </q-card-section>
                  </q-card>

                </q-expansion-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  }
}
</script>

<style>
</style>
