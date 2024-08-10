function secrets() {
  const fs = require('fs');
  const colors = require('colors');
  const version = require('../package.json').version;
  require('dotenv').config({
    path: '.env',
  });

  const targetPath = './src/environments/environment.ts';
  const envConfigFile = `export const environment = {
  version: '${version}',
  production: false,
  redirectUri: '${process.env['REDIRECT_URI']}',
  clientId: '${process.env['CLIENT_ID']}',
  clientSecret: '${process.env['CLIENT_SECRET']}',
};`;
  fs.writeFile(targetPath, envConfigFile, err => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log(
      colors.green(`Angular env file generated correctly at ${targetPath} \n`)
    );
  });
}

secrets();
