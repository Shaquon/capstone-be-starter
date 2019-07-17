const { Bid } = require("../models");
const { validateJwtMiddleware } = require("../auth")

const createBid = [validateJwtMiddleware, async (req, res) => {
    const { upc, listedPrice, bidPrice, productInfo, voucher, storeUsername, username } = req.body;

    const newBid = await Bid.create({ 
        upc,
        listedPrice,
        bidPrice,
        productInfo,
        voucher,
        storeUsername,
        username
    });

    res.send({ bid: newBid, statusCode: res.statusCode })
}] 


const getBid = [validateJwtMiddleware, async (req, res) => {
    // req.user ( this represents all the payload on the token )

    // if store, get all bids where storeUsername matches
    let whereObj = null;
    if (req.user.role === "store") {
        whereObj = { storeUsername: req.user.username }
    } else {
        whereObj = { username: req.user.username }
    }

    // if user, get all bids where username matches
    const bids = await Bid.find({ where: whereObj })

    res.send({ bids, statusCode: res.statusCode })
}]

// on FE - bid._id

const acceptBid = [validateJwtMiddleware, async (req, res) => {
    // req.body.accepted - boolean
    // req.params.bid

    // todo: check what updateOne result value is
    const bid = await Bid.updateOne({ where: { _id: req.params.bid }}, { bidStatus: req.body.accepted ? "accepted" : "declined" })

    res.send({ bid, statusCode: res.statusCode })
}]

module.exports = {
    createBid,
    getBid,
    acceptBid
}