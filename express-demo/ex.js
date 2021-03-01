const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.send('Hello from exp.');
});

app.listen(port, (error) => {
  if (error) {
    console.log(`cannot start because of ${error}`);
  }
  console.log(`server running on ${port}`);
});