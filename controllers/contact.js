const request = require('superagent');
const config = require('config');

const mailgun = require('mailgun-js')({
  apiKey: config.keys.mailgun,
  domain: config.addresses.mailgun.domain
});

/*
  POST api/contact
  REQUIRED
    tag: string, regarding: string, message: string, email: string,
    recaptcha: string
  RETURN
    error: boolean, message?: string
  DESCRIPTION
    Build a email using req.body and send to contact@xyfir.com
*/

module.exports = async function(req, res) {

  const b = req.body;

  try {
    // Check if reCaptcha response is valid
    const result = await request
      .post('https://www.google.com/recaptcha/api/siteverify')
      .type('form')
      .send({
        secret: config.keys.recaptcha,
        response: b.recaptcha,
        remoteip: req.ip
      });
    
    if (!result.body.success) throw 'Invalid captcha';
    
    // Email contact@xyfir.com with user's message'
    await mailgun.messages().send({
      to: 'contact@xyfir.com',
      from: 'contact@xyfir.com',
      text: b.message,
      subject: `${b.regarding} | ${b.tag} | ${b.email}`
    });

    res.json({ error: false });
  }
  catch (err) {
    res.json({ error: true, message: err });
  }

};