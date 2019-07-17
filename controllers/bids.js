const { Bid } = require("../models");
const { validateJwtMiddleware } = require("../auth");

const createBid = [
  validateJwtMiddleware,
  async (req, res) => {
    const {
      upc,
      listedPrice,
      bidPrice,
      productInfo,
      voucher,
      storeUsername,
      username
    } = req.body;

    // if you want to randomize bidStatus,
    // that would go here, before Bid.create

    const newBid = await Bid.create({
      upc,
      listedPrice,
      bidPrice,
      productInfo,
      voucher,
      storeUsername,
      username,
      bidStatus: "pending"
    });

    res.send({ bid: newBid, statusCode: res.statusCode });
  }
];

const getBids = [
  validateJwtMiddleware,
  async (req, res) => {
    // req.user ( this represents all the payload on the token )

    // if store, get all bids where storeUsername matches
    let whereObj = null;
    if (req.user.role === "store") {
      whereObj = { storeUsername: req.user.username };
    } else {
      whereObj = { username: req.user.username };
    }
    console.log(whereObj);
    // if user, get all bids where username matches
    const bids = await Bid.find(whereObj);
    console.log(bids);
    res.send({ bids, statusCode: res.statusCode });
  }
];

// on FE - bid._id

const acceptBid = [
  validateJwtMiddleware,
  async (req, res) => {
    // req.body.accepted - boolean
    // req.params.bid

    const bid = await Bid.findById(req.params.bid);
    bid.bidStatus = req.body.accepted ? "accepted" : "declined";
    await bid.save();

    res.send({
      bid,
      statusCode: res.statusCode
    });
  }
];

module.exports = {
  createBid,
  getBids,
  acceptBid
};
