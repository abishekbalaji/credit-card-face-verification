const mongoose = require("mongoose");

const creditCardDetails = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cardNumber: {
    type: String,
    required: true,
    trim: true,
  },
  expiryDate: {
    type: String,
    required: true,
    trim: true,
  },
  securityCode: {
    type: Number,
    required: true,
    trim: true,
  },
  photoID: {
    type: String,
    required: true,
    trim: true,
  },
});

const CreditCardDetails = mongoose.model("creditCard", creditCardDetails);

// const newDetails = new CreditCardDetails({
//   name: "Amutha V",
//   cardNumber: "3566 0020 2036 0505",
//   expiryDate: "12/22",
//   securityCode: 111,
//   photoID: "123abc",
// });

// newDetails.save();

module.exports = CreditCardDetails;
