const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {

    upc: { type: Number, required: true},
    listedPrice: { type: Number, required: true },
    bidPrice: { type: Number, required: true },
    productInfo: { type: String, required: true },
    voucher: { type: Number, required: true },
    storeUsername: { type: String, required: true },
    username: { type: String, required: true },
    bidStatus: { type: String, required: true, enum: ["pending", "accepted", "declined"]},
    // username: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    // role    : { type: String, required: true, enum: ["user", "store"] }
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    versionKey: false
  }
);

const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;
