const ethers = require('ethers');

module.exports = async(provider, address) => {
    return ethers.utils.formatEther(await provider.getBalance(address));
}