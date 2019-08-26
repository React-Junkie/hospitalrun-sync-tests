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
    console.log(this)
    this.id = null
    this.name = null
    this.rev = null
    this.device.lastLogin = null
    // if (this.catalog) {
    //   await this.catalog.destroy()
    // }
  }

  /**
   * Login to this device
   * @param secret
   * @returns {Promise.<void>}
   */
  async loginWithSecret (secret) {
    this.id = this.generateId()
    this.device.registerUserToDevice({ user: this, secret })
    // let readKeyStoreTest = await this.device.canReadKeystore({ user: this })
    // console.log(readKeyStoreTest)
    // if (!readKeyStoreTest) {
    //   this.id = null
    //   alert('Bad Password')
    // } else this.device.lastLogin = this.name
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

    // Register this User to the Device and Generate the Device Keystore
    this.device.registerUserToDevice({ user: this, secret })

    // Test the KeyStore
    let readKeyStoreTest = await this.device.canReadKeystore()

    // Abort if we can't read
    if (!readKeyStoreTest) throw new Error('Cannot read from the keystore!')
  }
}
