'use strict';

const app = require('./app');

const PORT = process.env.PORT || 9000;

app.set('port', PORT);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});