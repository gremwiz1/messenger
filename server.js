const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;


app.use(express.static(`${__dirname}/dist`));
app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});