import mongoose from "mongoose";

const careWorkerSchema = mongoose.Schema({
  number: { type: Number, required: true },
  email: { type: String, required: true },
  availability: [
    {
      type: String,
      required: true,
    },
  ],
});

const CareWorker = mongoose.model("CareWorker", careWorkerSchema);

export default CareWorker;
