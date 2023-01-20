const express = require('express');
const service = require('./contractService');


const router = express.Router();

router.post('/transferNFT', (req, res) =>{

    // const addrTo = req.body.to;
    // const tokenId = req.body.tokenId;
    
})

router.get('/toyOwner/:id', (req, res) =>{

    try {
        const ownerAddress =  service.getToyOwner(req.params.id);
        if(!ownerAddress) res.send('Empty');
        res.send({
            owner: ownerAddress,
            tokenId: req.params.id,
            contract: service.getToyAddress()
        })
    } catch (error) {
        res.send(error)
    }

    
})

module.exports = router;