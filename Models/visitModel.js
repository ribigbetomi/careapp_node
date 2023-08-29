const mongoose = require("mongoose");

const visitSchema = mongoose.Schema(
  {
    time: {
      type: Date,
      required: true,
    },
    date: {
      type: Date,
    },
    type: {
      type: String,
      required: true,
    },
    serviceUserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ServiceUser",
    },
    careWorkers: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CareWorker",
        },
        name: {
          type: String,
          ref: "CareWorker",
        },
        checkInTime: { type: Date },
        checkOutTime: { type: Date },
        timeSpent: { type: Number },
      },
    ],
    careLog: {
      visitID: {
        type: mongoose.Schema.Types.ObjectId,
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
        name: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;
