exports.environment = {
  type: '', // development|production
  port: -1
};

exports.keys = {
  recaptcha: '',
  mailgun: ''
};

exports.addresses = {
  mailgun: {
    domain: '',
    api: `https://api:${exports.keys.mailgun}@api.mailgun.net/v3/`
  }
};
