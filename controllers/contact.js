const validateCaptcha = require('lib/validate-captcha');
const sendEmail = require('lib/send-email');

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
    await validateCaptcha(req.body.recaptcha, req.ip);

    await sendEmail(`${b.regarding} | ${b.tag} | ${b.email}`, b.message);

    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err });
  }
};
