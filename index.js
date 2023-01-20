const express = require('express');

const app = express();

// Routes
require('./setup/routes')(app);
require('./setup/appUtils')(app);

// start app
const port = process.env.PORT || 3000
console.log(port);
app.listen(port, () => console.log(`Listening at port ${port}...`));