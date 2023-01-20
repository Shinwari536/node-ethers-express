const contractRouter = require('../contract/contractRouter');


module.exports = function(app) {
    app.use('/sc', contractRouter);
}