const getAds = require('lib/get-ads');

/*
  GET /api/ads
  OPTIONAL
    count: number, xyfir:  boolean, blacklist: string, keywords: string
  RETURN
    [{ https://github.com/Xyfir/Ads/blob/master/ads.json }]
*/

module.exports = async function(req, res) {
  const options = {
    count: +req.query.count || 1,
    keywords: req.query.keywords ? req.query.keywords.split(',') : [],
    blacklist: req.query.blacklist
      ? req.query.blacklist.split(',').map(a => (isNaN(+a) ? a : +a))
      : []
  };

  if (req.query.xyfir) options.xyfir = !!+req.query.xyfir;

  res.json(await getAds(options));
};
