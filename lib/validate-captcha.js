const request = require('superagent');
const config = require('config');

/**
 * Throws an error if captcha response is invalid.
 * @async
 * @param {string} captchaResponse
 * @param {string} ip
 */
module.exports = async function(captchaResponse, ip) {

  // Check if captcha response is valid
  const result = await request
    .post('https://www.google.com/recaptcha/api/siteverify')
    .type('form')
    .send({
      secret: config.keys.recaptcha,
      response: captchaResponse,
      remoteip: ip
    });
  
  if (!result.body.success) throw 'Invalid captcha';

}