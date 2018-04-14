const config = require('config');

const mailgun = require('mailgun-js')({
  apiKey: config.keys.mailgun,
  domain: config.addresses.mailgun.domain
});

/**
 * Sends an email from and to `contact@xyfir.com`.
 * @param {string} subject
 * @param {string} text
 */
module.exports = async function(subject, text) {
  await mailgun.messages().send({
    to: 'contact@xyfir.com',
    from: 'contact@xyfir.com',
    text,
    subject
  });
};
