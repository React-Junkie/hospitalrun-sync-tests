import Device from './Device'

/**
 * The User Class
 */
export default class User {
  /**
   * Create a New User
   */
  constructor () {
    /**
     * Unique User ID
     *   ${this.organization}_${this.device.id}_${this.name}
     * @type {string}
     */
    this.id = null
    /**
     * Unique Username
     * @type {string}
     */
    this.name = null
    /**
     * This Users Current Organization
     * @type {string}
     */
    this.organization = null
    /**
     * The Current Device Instance
     * @type {Device}
     */
    this.device = null
    /**
     * Metadata
     * @type {{firstName: string, lastName: string}}
     */
    this.meta = {
      firstName: null,
      lastName: null
    }
  }

  /**
   * Setup a basic User Instance with it's Device Fingerprint
   * @returns {Promise.<void>}
   */
  async init () {
    this.device = new Device()
    await this.device.init()
    this.name = this.device.lastLogin ? this.device.lastLogin : this.name
  }

  /**
   * Build a User ID string
   * @returns {string}
   */
  generateId () {
    return `${this.organization || 'HostpitalRun'}_${this.device.id}_${this.name || 'Public'}`
  }

  /**
   * Logout of this device
   */
  logout () {
    this.id = undefined
    this.name = undefined
    this.rev = undefined
    this.organization = undefined
    this.device.lastLogin = undefined
    // Maybe do some cleanup
    // if (this.catalog) {
    //   await this.catalog.destroy()
    // }
  }

  /**
   * Login to this device
   *   Must have a User, Organization, and Device
   * @param secret
   * @returns {Promise.<void>}
   */
  async loginWithSecret (secret) {
    // Make sure default organization is set
    if (!this.organization) this.organization = 'HospitalRun'
    // Make sure ID is set
    this.id = this.generateId()
    // Update Database Index
    await this.device.updateDBIndex()
    // Check if user database exists
    if (this.device.databases.indexOf(`${this.id}_keystore`) === -1) {
      let e = new Error('Must be registered user')
      e.name = 'NotRegistered'
      throw e
    } else {
      // Attempt to login to the keystore
      this.device.registerUserToDevice({ user: this, secret, type: 'login' })
      let readKeyStoreTest = await this.device.canReadKeystore({ user: this })
      console.log('Can Login?', readKeyStoreTest)
      if (!readKeyStoreTest) {
        this.logout()
        alert('Bad Password')
      } else this.device.lastLogin = this.name
    }
  }

  /**
   * Register New User
   * @param name
   * @param secret
   * @param organization
   * @returns {Promise.<void>}
   */
  async register ({ name, secret, organization = 'HospitalRun' }) {
    // Setup this User Instance
    this.name = name
    this.organization = organization
    this.id = this.generateId()
    // Update Database Index
    await this.device.updateDBIndex()
    // Check if user database exists
    if (this.device.databases.indexOf(`${this.id}_keystore`) !== -1) {
      let e = new Error('User exists!')
      e.name = 'UserExists'
      throw e
    } else {
      // Register this User to the Device and Generate the Device Keystore
      this.device.registerUserToDevice({ user: this, secret })

      // Test the KeyStore
      let readKeyStoreTest = await this.device.canReadKeystore()

      // Abort if we can't read
      if (!readKeyStoreTest) throw new Error('Cannot read from the keystore!')
    }
  }
}
