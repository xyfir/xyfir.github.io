const favicons = require('favicons');
const package = require('./package.json');
const util = require('util');
const path = require('path');
const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);

favicons('icon.png', {
  path: '/static/icons/',
  appName: 'Xyfir',
  appDescription: null,
  developerName: 'Xyfir, LLC',
  developerURL: 'https://www.xyfir.com',
  dir: 'auto',
  lang: 'en-US',
  background: '#FFF',
  theme_color: '#2196f3',
  display: 'standalone',
  orientation: 'any',
  start_url: '/',
  version: package.version,
  logging: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: { offset: 25 },
    favicons: true,
    firefox: true,
    windows: true,
    yandex: true
  }
},
async (error, response) => {
  if (error) return console.error(error);

  for (let img of response.images) {
    await writeFile(
      path.resolve(__dirname, 'static/icons/', img.name),
      img.contents
    );
  }

  console.log('Icons generated');
});