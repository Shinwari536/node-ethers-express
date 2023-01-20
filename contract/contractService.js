const ethers = require('ethers');
const serviceDebugger = require('debug')('app:sc_service');
const abiNFC = require('../utils/abi/nfc_abi.json');
const abiToy = require('../utils/abi/toy_abi.json');
const signer = require('../utils/signer');

const nfc = new ethers.Contract(process.env.NFC_ADDR, abiNFC, signer);
const toy = new ethers.Contract(process.env.TOY_ADDR, abiToy, signer);

function getNFCAddress(){
    return nfc.address;
}

function getToyAddress(){
    return toy.address;
}

async function getToyOwner(tokenId) {
    try {
        return await toy.ownerOf(tokenId);
    } catch (error) {
        serviceDebugger(error);
        throw error;
    }
}

async function getNFCOwner(tokenId) {
    try {
        return await nfc.ownerOf(tokenId);
    } catch (error) {
        serviceDebugger(error);
        throw error;
    }
}

async function mintNFCByOwner(to, qty) {
    try {
        return await nfc.privilegedMinting(to, qty);
    } catch (error) {
        serviceDebugger(error);
        throw error;
    }
}

async function checkWithrawlStatus(tokenId) {
    try {
        return await toy.getWithdrawlStatus(tokenId);
    } catch (error) {
        serviceDebugger(error);
        throw error;
    }
}


async function transferToy(to, tokenId) {
    try {
        const tokenOwner = await nfc.ownerOf(tokenId);
        if(tokenOwner === to) return await toy.transferNFTOwnership(signer.address, to, tokenId);
        throw new Error('Owner is not verified.');
    } catch (error) {
        serviceDebugger(error);
        throw error;
    }
}

module.exports = {
    getNFCAddress,
    getToyAddress,
    getToyOwner,
    getNFCOwner,
    mintNFCByOwner,
    transferToy,
    checkWithrawlStatus
}
