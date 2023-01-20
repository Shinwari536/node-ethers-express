const express = require('express');
const { getToyAddress, getToyOwner, getNFCAddress, getNFCOwner, mintNFCByOwner, checkWithrawlStatus, transferToy } = require('./contractService');


const router = express.Router();

/**
 *          Toy Contract
 */
router.get('/toy/owner/:id', async (req, res) => {

    try {
        const ownerAddress = await getToyOwner(req.params.id);
        if (!ownerAddress) res.send('Empty');
        res.send({
            owner: ownerAddress,
            tokenId: req.params.id,
            contract: `https://goerli.etherscan.io/address/${getToyAddress()}`
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/toy/withdrawl/:id', async (req, res) => {

    try {
        const status = await checkWithrawlStatus(req.params.id);
        if (status) {
            const ownerAddress = await getToyOwner(req.params.id);
            res.send({
                owner: ownerAddress,
                messag: `Token is already withdrawl.`,
                tokenId: req.params.id,
                contract: `https://goerli.etherscan.io/address/${getToyAddress()}`
            })

        }
        res.send({
            status: status,
            message: `Token is not withdrawl yet.`,
            tokenId: req.params.id,
            contract: `https://goerli.etherscan.io/address/${getToyAddress()}`
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/toy/transfer', async (req, res) => {
    try {
        const status = await checkWithrawlStatus(req.body.tokenId);
        if(status) res.status(500).send({
            message: 'Toy NFT is already transfered.'
        });
        const result = await transferToy(req.body.to, req.body.tokenId);
        res.send({
            transaction_Hash: `https://goerli.etherscan.io/tx/${result.hash}`,
            message: 'Toy NFT Transfered successfully'
        })
    } catch (error) {
        res.status(500).send(error);
    }
});



/**
 *          NFC Card Contract
 */
router.get('/nfc/owner/:id', async (req, res) => {

    try {
        const ownerAddress = await getNFCOwner(req.params.id);
        if (!ownerAddress) res.send('Empty');
        res.send({
            owner: ownerAddress,
            tokenId: req.params.id,
            contract: `https://goerli.etherscan.io/address/${getNFCAddress()}`
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


router.post('/nfc/mint', async (req, res) => {
    try {
        const result = await mintNFCByOwner(req.body.to, req.body.qty);
        if (!result) res.send('Empty');
        res.send({
            transaction_Hash: `https://goerli.etherscan.io/tx/${result.hash}`,
            contract: `https://goerli.etherscan.io/address/${getNFCAddress()}`
        })
    } catch (error) {
        res.status(500).send(error);
    }
})



module.exports = router;