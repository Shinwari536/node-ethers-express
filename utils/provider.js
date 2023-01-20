require('dotenv').config();
const ethers = require('ethers');

const rpcKey = process.env.RCP_KEY;
const gorli = process.env.GOERLI;
const url = gorli + rpcKey;

module.exports = new ethers.providers.JsonRpcProvider(url)
