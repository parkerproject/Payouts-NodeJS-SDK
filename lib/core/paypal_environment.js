'use strict';

const paypalhttp = require('@paypal/paypalhttp');
const SANDBOX = 'https://api.sandbox.paypal.com';
const LIVE = 'https://api.paypal.com';
const SANDBOX_WEB_URL = 'https://www.sandbox.paypal.com';
const LIVE_WEB_URL = 'https://www.paypal.com';

/**
 * Base class for PayPal Environments
 */
class PayPalEnvironment extends paypalhttp.Environment {
  /**
   * @param {string} clientId - The client id for this environment
   * @param {string} clientSecret - The client secret
   * @param {string} baseUrl - The base url to execute requests
   * @param {string} webUrl - The web url to authorize user's consent
   * @param {string} accessToken - The access token to authorize user's consent
   */
  constructor(clientId, clientSecret, baseUrl, webUrl, accessToken) {
    super(baseUrl);
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.webUrl = webUrl;
    this.accessToken = accessToken;
  }

  /**
   * Authorization header string for basic authentication with the current client id and secret
   * @return {string} - The authorization header value
   */
  authorizationString() {

    if(this.accessToken){
      return `Bearer ${this.accessToken}`;
    }

    let encoded = new Buffer(`${this.clientId}:${this.clientSecret}`).toString('base64');
    return `Basic ${encoded}`;
  }
}

/**
 * Sandbox Environment
 */
class SandboxEnvironment extends PayPalEnvironment {

  constructor(clientId, clientSecret) {
    super(clientId, clientSecret, SANDBOX, SANDBOX_WEB_URL);
  }
}

/**
 * Live Environment
 */
class LiveEnvironment extends PayPalEnvironment {

  constructor(clientId, clientSecret) {
    super(clientId, clientSecret, LIVE, LIVE_WEB_URL);
  }
}


/**
 * Sandbox Environment using Access Token
 */
 class SandboxEnvironmentWithAccessToken extends PayPalEnvironment {

  constructor(accessToken) {
    super(null, null, SANDBOX, SANDBOX_WEB_URL, accessToken);
  }
}

/**
 * Live Environment with Access token
 */
class LiveEnvironmentWithAccessToken extends PayPalEnvironment {

  constructor(accessToken) {
    super(null, null, LIVE, LIVE_WEB_URL, accessToken);
  }
}

module.exports = {
  PayPalEnvironment: PayPalEnvironment,
  LiveEnvironment: LiveEnvironment,
  SandboxEnvironment: SandboxEnvironment,
  LiveEnvironmentWithAccessToken: LiveEnvironmentWithAccessToken,
  SandboxEnvironmentWithAccessToken: SandboxEnvironmentWithAccessToken
};