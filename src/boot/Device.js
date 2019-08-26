import Fingerprint2 from 'fingerprintjs2'
import PouchDB from 'pouchdb'

/**
 * Device Handles linking users to local/remote storage
 */
export default class Device {
  constructor () {
    /**
     * Unique ID of this Device
     * @type {string}
     */
    this.id = null

    /**
     * Active Device User
     *   Handles access control to the local storage
     * @type {User}
     */
    this.user = null

    /**
     * Registrations Mappings
     *   Any new or old databases created on this
     *   device will be mapped here
     * @type {{}}
     */
    this.registrations = {
      /**
       * {
         *   "HospitalRun": {
         *     "deviceX": {
         *       "userX": {
         *          "keystore": "keystoreDBPath"
         *          "catalog": "catalogDBPath"
         *         }
         *      }
         *   }
         * }
       */
    }

    /**
     * KeyStore
     *   A generic keystore for storing Client Side Encryption Keys.
     *
     *   Uses Crypto-Pouch to fully encrypt the store
     *   and the secret/user password is used to infer
     *   authentication. If the user has access to a
     *   keystore we assume they are a valid user
     *
     *   Database name should always be in the following formats
     *
     *   Local:
     *   PouchDB('organizationName_currentLocation_currentUser_keystore')
     *
     *   Remote:
     *   PouchDBB('https://organization.domain/currentUser_keystore')
     *
     *   @example
     *   this.keystore.crypto('secret') // database is unlocked
     *
     * @type {PouchDB}
     */
    this.keystore = null

    /**
     * Placeholder for catalog data
     * @type {PouchDB}
     */
    this.catalog = null
  }

  set lastLogin (user) {
    console.log(user)
    localStorage.setItem('user', user || '')
  }

  get lastLogin () {
    return localStorage.getItem('user')
  }
  /**
   * Setup the Device Keystore
   *   Configures the local keystore instance based on
   *   the user model passed in. Encrypts the store with
   *   the user's provided secret
   *
   * @param user {User} An instance of a User
   * @param secret {string} The secret to encrypt the keystore with
   */
  setKeyStore ({ secret }) {
    // User must always have a name
    if (!this.user || !this.user.name || !this.user.id) throw new Error('Musts have a Username to create a Keystore')
    // User must provide a valid secret
    if (!secret) throw new Error('Cannot create Keystore without a KeystoreSecret')

    // Create Keystore
    if (this.keystore === null) {
      this.keystore = new PouchDB(`${this.user.id}_keystore`)
      // Set encryption
      this.keystore.crypto(secret)
    }
  }

  /**
   * Register User to Device
   * @param user {User} An instance of a User
   * @param secret {string} An optional secret to init the keystore with
   * @param databaseString {string} An optional database path
   */
  registerUserToDevice ({ user, secret, databaseString }) {
    // Ensure Organization Key Exists
    if (typeof this.registrations[user.organization] === 'undefined') {
      this.registrations[user.organization] = {}
    }
    // Ensure Device Key Exists
    if (typeof this.registrations[user.organization][this.id] === 'undefined') {
      this.registrations[user.organization][this.id] = {}
    }
    // Ensure User Key Exists
    if (typeof this.registrations[user.organization][this.id][user.name] === 'undefined') {
      this.registrations[user.organization][this.id][user.name] = {}
    }

    // Path manually specified
    if (databaseString) {
      // Register Passed in Keystore
      if (databaseString.match('keystore')) {
        this.registrations[user.organization][this.id][user.name].keystore = databaseString
      }
      // Register Passed in Catalog
      if (databaseString.match('catalog')) {
        this.registrations[user.organization][this.id][user.name].catalog = databaseString
      }
    } else { // Attempt to register current keystore/catalog
      // Register Current Keystore
      if (this.keystore && this.keystore.name) {
        this.registrations[user.organization][this.id][user.name].keystore = this.keystore.name
      }
      // Register Current Catalog
      if (this.catalog && this.catalog.name) {
        this.registrations[user.organization][this.id][user.name].keystore = this.catalog.name
      }
    }

    if (typeof user.id !== 'undefined' && secret) {
      // Set Device User
      this.user = user
      // Enable User KeyStore
      this.setKeyStore({ secret })
      // Set the Last User to the Current User
      this.lastLogin = user.name
    }
  }

  /**
   * Test the keystore and sync current metadata
   * @returns {Promise}
   */
  async canReadKeystore () {
    return new Promise(async (resolve) => {
      let doc
      let user = this.user
      try {
        doc = await this.keystore.get(user.id)
        console.log('Doc exists', doc)
        user = { ...user, ...doc }
        resolve(typeof doc.meta === 'undefined')
      } catch (e) {
        // No Document found try to Read/Write
        if (e.name === 'not_found') {
          console.log('Not found!')
          try {
            console.log(user.meta)
            await this.keystore.put({ _id: user.id, meta: user.meta })
          } catch (err) {
            console.log(err)
            console.log('!!!!!!!!!!!!!!!!!!!!!')
            resolve(false)
          }

          // Get Saved Instance
          doc = await this.keystore.get(user.id)

          // Update instance
          user.meta = doc.meta
          user.rev = doc._rev

          console.log(user)
          // If no meta data key then failed to read
          if (typeof doc.meta === 'undefined') resolve(false)
          else resolve(true)
        }
        resolve(false)
      }
    })
  }

  /**
   * Setup a basic User Instance with it's Device Fingerprint
   * @returns {Promise.<Device>}
   */
  async init () {
    let { id, meta } = await this.getDeviceFingerprint()
    this.id = id
    this.meta = meta
    this.databases = await PouchDB.allDbs()

    if (this.databases.length > 0) {
      this.databases.forEach((databaseString) => {
        this.registerExistingDatabase(databaseString)
      })
    }
    return this
  }

  /**
   * Load existing database from database string
   * @param databaseString
   */
  registerExistingDatabase (databaseString) {
    let user = this.deserializeUserFromDatabaseString(databaseString)
    this.registerUserToDevice({ user, databaseString })
  }

  /**
   * Converts databaseString into a User Object
   * @param databaseString
   * @returns {{organization: *, device: {id: *}, name: *}}
   */
  deserializeUserFromDatabaseString (databaseString) {
    let ss = databaseString.split('_')
    console.log(ss)
    return {
      organization: ss[0],
      device: { id: ss[1] },
      name: ss[2]
    }
  }

  /**
   * Generate Device ID
   * @returns {Promise}
   */
  async getDeviceFingerprint () {
    return new Promise((resolve) => {
      let meta = {}
      Fingerprint2.get((components) => {
        let values = components.map((component) => {
          meta[component.key] = component.value
          return component.value
        })
        resolve({ meta, id: Fingerprint2.x64hash128(values.join(''), 31) })
      })
    })
  }
}
