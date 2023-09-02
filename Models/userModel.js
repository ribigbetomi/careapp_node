const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    accessType: { type: String, required: true },
    email: { type: String, required: true },
    withCompany: { type: Boolean, required: true },
    company: {
      name: { type: String, required: true },
      branch: { type: String },
    },
    // password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
