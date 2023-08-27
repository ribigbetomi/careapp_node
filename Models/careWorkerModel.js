import mongoose from "mongoose";

const careWorkerSchema = mongoose.Schema(
  {
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    availability: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CareWorker = mongoose.model("CareWorker", careWorkerSchema);

export default CareWorker;
