/* eslint-disable  no-console */

import "./polyfills";
import app from "./app";
import fs from "fs";

const PORT = process.env.HTTP_PORT || 3000;
const IP = process.env.HTTP_IP || undefined;

// cache the assets manifest
if (app.env === "production") {
  const content = fs.readFileSync("public/static/manifest.json", "utf8");
  app.assetsManifest = JSON.parse(content);
}

app.listen(PORT, IP, () => {
  console.log(
    `============= [app started at http://${IP ? IP : "localhost"}:${PORT}]============= `
  );
});
