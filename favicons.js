const favicons = require('favicons');
const util = require('util');
const path = require('path');
const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);

/**
 * @param {string} icon
 * @param {string} output
 * @param {string} name
 */
function generate(icon, output, name) {
  return new Promise((resolve, reject) =>
    favicons(
      `icons/${icon}`,
      {
        path: `/${output}`,
        appName: name,
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
        version: null,
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
        if (error) reject(error);
        for (let img of response.images) {
          await writeFile(
            path.resolve(__dirname, output, img.name),
            img.contents
          );
        }
        resolve();
      }
    )
  );
}

(async function() {
  const projects = [
    {
      name: 'Xyfir',
      icon: 'xyfir.png',
      output: 'dist/icons/xyfir/'
    },
    {
      name: 'xyAnnotations',
      icon: 'xyannotations.png',
      output: 'dist/icons/xyfir-annotations/'
    },
    {
      name: 'Ptorx',
      icon: 'ptorx.png',
      output: 'dist/icons/ptorx/'
    },
    {
      name: 'xyReader',
      icon: 'xyreader.png',
      output: 'dist/icons/xyfir-reader/'
    },
    {
      name: 'BrHop',
      icon: 'brhop.png',
      output: 'dist/icons/brhop/'
    }
  ];

  for (let project of projects) {
    try {
      await generate(project.icon, project.output, project.name);
      console.log('Icons generated for', project.name);
    } catch (err) {
      console.error(err);
    }
  }
})();
