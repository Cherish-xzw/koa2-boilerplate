/* eslint-disable  no-console */

import './polyfills';
import app from './app';

const PORT = process.env.HTTP_PORT || 3000;
const IP = process.env.HTTP_IP || undefined;

app.listen(PORT, IP, () => {
  console.log(
    `============= [app started at http://${IP ? IP : "localhost"}:${PORT}]============= `
  );
});
