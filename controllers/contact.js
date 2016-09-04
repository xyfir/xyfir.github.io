const request = require("request");
const config = require("config");

const mailgun = require("mailgun-js")({
	apiKey: config.keys.mailgun,
	domain: config.addresses.mailgun.domain
});

/*
    POST api/contact
    REQUIRED
        tag: string, regarding: string, message: string, email: string,
        recaptcha: string
    RETURN
        error: boolean
    DESCRIPTION
        Build a email using req.body and send to contact@xyfir.com
*/

module.exports = function(req, res) {

    // Check if reCaptcha response is valid
    request.post({
        url: "https://www.google.com/recaptcha/api/siteverify",
        form: {
            secret: config.keys.recaptcha,
            response: req.body.recaptcha,
            remoteip: req.ip
        }
    }, (e, r, body) => {
        if (e || !JSON.parse(body).success) {
            res.json({ error: true });
        }
        else {
            // Email contact@xyfir.com with user's message'
            mailgun.messages().send({
                from: req.body.email, to: "contact@xyfir.com",
                subject: req.body.regarding + " | " + req.body.tag,
                text: req.body.message
            }, (err, body) => {
                res.json({ error: !!err });
            });
        }
    });

};