const validateCaptcha = require('lib/validate-captcha');
const sendEmail = require('lib/send-email');

/*
  POST /api/advertise
  RETURN
    error: boolean, message?: string
  DESCRIPTION
    Build an email using req.body and send to contact@xyfir.com
*/
module.exports = async function(req, res) {
  try {
    await validateCaptcha(req.body.recaptcha, req.ip);
    await sendEmail('Xyfir Ads | New Ad', JSON.stringify(req.body, null, 2));
    res.status(200).json({ error: false });
  } catch (err) {
    res.status(500).json({ error: true, message: err });
  }
};
