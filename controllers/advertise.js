const validateCaptcha = require('lib/validate-captcha');
const sendEmail = require('lib/send-email');

/*
  POST api/advertise
  RETURN
    error: boolean, message?: string
  DESCRIPTION
    Build an email using req.body and send to contact@xyfir.com
*/
module.exports = async function(req, res) {

  try {
    await validateCaptcha(req.body.recaptcha, req.ip);

    const message = Object
      .keys(req.body)
      .map(key => `**${key}** = ${req.body[key]}`)
      .join('\n\n');
    
    await sendEmail('Xyfir Ads | New Ad', message);

    res.json({ error: false });
  }
  catch (err) {
    res.json({ error: true, message: err });
  }

};