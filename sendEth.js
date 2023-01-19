const ethers = require('ethers');

module.exports = async (addrTo, amount, signer) => {
    const txCount = await signer.getTransactionCount();
    const trx = {
        nonce: ethers.utils.hexlify(txCount),
        to: addrTo,
        value: amount, // without gas price and limit
    }
    const trxHash = await signer.sendTransaction(trx);
    return trxHash;

}