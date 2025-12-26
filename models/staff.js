const mongoose = require("mongoose");

const staffDetails = new mongoose.Schema({
  staffName: {
    type: String,
    required: true,
  },

  staffId: {
    type: Number,
    required: true,
    unique: true,
  },

  emailId: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("staffdt", staffDetails);
