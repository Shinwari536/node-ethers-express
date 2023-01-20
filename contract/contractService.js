const ethers = require('ethers');
const { func } = require('joi');
const serviceDebugger = require('debug')('app:sc_service');
const abiNFC = require('../utils/abi/nfc_abi.json');
const abiToy = require('../utils/abi/toy_abi.json');
const signer = require('./utils/signer');


const nfc = new ethers.Contract(process.env.NFC_ADDR, abiNFC, signer);
const toy = new ethers.Contract(process.env.TOY_ADDR, abiToy, signer);

export function getNFCAddress(){
    return nfc.address;
}

export function getToyAddress(){
    return toy.address;
}

export async function getToyOwner(tokenId) {
    try {
        return await toy.ownerOf(tokenId);
    } catch (error) {
        throw error;
    }
}

