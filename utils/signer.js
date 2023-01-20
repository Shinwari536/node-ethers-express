require('dotenv').config();
const ethers = require('ethers');
const provider = require('./provider')

module.exports = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider);