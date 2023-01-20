const ethers = require('ethers');
const getBalance = require('./balance');
const abi = require('./abi.json');
const sendEthTo = require('./utils/sendEth');
const provider = require('./provider');
const signer = require('./utils/signer');


provider.getBlockNumber().then((result) => {
    console.log("Current Block is: ", result);
})


getBalance(provider, signer.address).then((balance) => {
    console.log("My Balance: ", balance);
})

getBalance(provider, '0x95d214e60C1881FAcfca90D8909F0DdEE63F004f').then((balance) => {
    console.log("`To` Balance: ", balance);
})

const contract = new ethers.Contract(process.env.CONTRACT_ADDR, abi, signer);

// console.log(contract.functions);

// sending ETH to `0x95d214e60C1881FAcfca90D8909F0DdEE63F004f`
sendEthTo('0x95d214e60C1881FAcfca90D8909F0DdEE63F004f', ethers.utils.parseEther('0.0000000001'), signer).then((result) => {
    console.log("Transaction result: ", result.hash);

});


