const mongoose = require("mongoose");

const visitSchema = mongoose.Schema(
  {
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
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
        userID: {
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
      // visitID: {
      //   type: mongoose.Schema.Types.ObjectId,
      // },
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
        type: String,
      },
      toiletVisit: {
        type: { type: String },
        observed: { type: Boolean },
        quantity: { type: String },
      },
      mood: {
        type: { type: String },
        note: { type: String },
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
    tasks: [
      {
        name: { type: String },
        required: true,
      },
    ],
    medications: [
      {
        name: { type: String },
      },
    ],
    PRNs: [
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
