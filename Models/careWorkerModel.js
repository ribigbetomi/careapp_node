const mongoose = require("mongoose");

const careWorkerSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    isAdmin: { type: Boolean, default: false },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    visits: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Visit" },
        checkInTime: { type: Date },
        checkOutTime: { type: Date },
        timeSpent: { type: Number },
      },
    ],
    availability: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Login
careWorker.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
careWorkerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const CareWorker = mongoose.model("CareWorker", careWorkerSchema);

module.exports = CareWorker;
