const mongoose = require("mongoose");

const serviceUserHandlerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

serviceUserHandler.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
serviceUserHandlerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const ServiceUserHandler = mongoose.model(
  "ServiceUserHandler",
  serviceUserHandlerSchema
);

module.exports = ServiceUserHandler;
