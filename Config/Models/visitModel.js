import mongoose from "mongoose";

const visitSchema = mongoose.Schema({
  time: {
    type: Date,
    required: true,
  },
  serviceUserID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "ServiceUser",
  },
  careWorkersID: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  careLog: {
    visitID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    note: {
      type: String,
    },
    coronaSymptoms: {
      type: String,
    },
    drink: {
      name: { type: String },
      observed: { type: Boolean },
      quantity: { type: String },
    },
    food: {
      name: { type: String },
      observed: { type: Boolean },
      quantity: { type: String },
    },
    toiletVisit: {
      type: { type: String },
      observed: { type: Boolean },
      quantity: { type: String },
    },
    mood: {
      type: String,
    },
    mentalHealth: {
      type: String,
    },
    physicalHealth: {
      type: String,
    },
    weight: {
      type: String,
    },
  },
  taskAndMedications: [
    {
      name: { type: String, required },
    },
  ],
});

const Visit = mongoose.model("Visit", visitSchema);

export default Visit;
