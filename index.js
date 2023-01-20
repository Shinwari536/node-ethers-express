const express = require('express');

const app = express();

// APP Utiles
require('./setup/appUtils')(app);
// Routes
require('./setup/routes')(app);

// start app
const port = process.env.PORT || 3000
console.log(port);
app.listen(port, () => console.log(`Listening at port ${port}...`));