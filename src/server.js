const express = require('express');

const app = express();
const { PORT = 4000 } = process.env;

app.use(express.static('dist'));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});