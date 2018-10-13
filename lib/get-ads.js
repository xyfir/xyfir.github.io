const request = require('superagent');

let ads = [];

/**
 * Return matching ad(s) from the xyAds public repository.
 * @param {object} [options]
 * @param {number} [options.count=1] - Number of ads to attempt to retrieve.
 * @param {boolean} [options.xyfir] - Determines how to handle ads created by
 * the Xyfir Network. Set `true` to only return Xyfir-created ads; `false` to
 * return all non-Xyfir ads; and leave undefined for both.
 * @param {Array.<string|number>} [options.blacklist] - Blacklist ads by slot
 * (array) index if number or by name if string.
 * @param {Array.<string>} [options.keywords] - Increase likelyhood of an ad
 * being returned if it has keywords that match the provided keywords. If
 * keywords are not provided, ads are randomly selected from those available.
 * @return {Array.<object>}
 */
module.exports = async function(options = {}) {
  if (!ads.length) await loadAds();

  return ads
    .slice()
    .filter((ad, slot) => {
      if (options.xyfir != undefined) {
        if (options.xyfir && ad.creator != 'Xyfir') return false;
        if (!options.xyfir && ad.creator == 'Xyfir') return false;
      }

      if (options.blacklist) {
        for (let blacklisted of options.blacklist) {
          if (typeof blacklisted == 'number' && slot == blacklisted)
            return false;
          if (typeof blacklisted == 'string' && ad.name == blacklisted)
            return false;
        }
      }

      if (options.keywords) {
        const keywordString = options.keywords.join(' ');
        ad.score = 0;

        for (let keyword of ad.keywords) {
          // Check for exact keyword match
          if (options.keywords.indexOf(keyword) > -1) ad.score += 3;
          // Check for partial match
          else if (keywordString.indexOf(keyword) > -1) ad.score++;
        }
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by score
      if (options.keywords) {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;

        // Random sort if scores are equal
        return Math.round(Math.random()) == 0 ? -1 : 1;
      }
      // Random sort
      else {
        return Math.round(Math.random()) == 0 ? -1 : 1;
      }
    })
    .slice(0, options.count || 1);
};

async function loadAds() {
  try {
    const result = await request.get(
      'https://raw.githubusercontent.com/Xyfir/Ads/master/ads.json'
    );
    ads = JSON.parse(result.text);
  } catch (err) {
    setTimeout(loadAds, 60 * 1000);
  }
}

setInterval(loadAds, 86400 * 1000);
