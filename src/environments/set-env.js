const setEnv = () => {
  const fs = require("fs");
  const writeFile = fs.writeFile;
  const targetPath = "./src/environments/environment.ts";
  const colors = require("colors");
  const version = require("../../package.json").version;
  require("dotenv").config({
    path: "src/environments/.env",
  });
  const envConfigFile = `export const environment = {
    version: '${version}',
    production: false,
    redirectUri: '${process.env["REDIRECT_URI"]}',
    clientId: '${process.env["CLIENT_ID"]}',
    clientSecret: '${process.env["CLIENT_SECRET"]}',
  };
  `;
  console.log(colors.magenta("The file `environment.ts` will be written"));
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        colors.magenta(
          `Angular environment.ts file generated correctly at ${targetPath} \n`
        )
      );
    }
  });
};

setEnv();
