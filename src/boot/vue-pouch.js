import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-users'))
import cp from 'crypto-pouch'
PouchDB.plugin(cp)
import pdf from 'pouchdb-find'
PouchDB.plugin(pdf)
import pdlf from 'pouchdb-live-find'
PouchDB.plugin(pdlf)
import pda from 'pouchdb-authentication'
PouchDB.plugin(pda)
import pouchVue from 'vue-pouch'
// import securityPlugin from 'pouchdb-security-helper'
// PouchDB.plugin(securityPlugin)

import VueGlobalVar from 'vue-global-var'

require('pouchdb-all-dbs')(PouchDB)

import User from './User'

export default async ({ Vue }) => {
  // Create a base User
  let localUser = new User({})
  // Initialize User
  await localUser.init()

  // Add Global Vars
  Vue.use(VueGlobalVar, {
    globals: {
      $user: localUser
    }
  })
  // Add pouchdb
  Vue.use(pouchVue, {
    pouch: PouchDB
  })
}
