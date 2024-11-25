const mongoose = require("mongoose");

const serviceUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    entryNote: {
      type: String,
      required: true,
    },
    company: {
      name: { type: String, required: true },
      branch: { type: String },
    },
    withCompany: { type: Boolean, required: true },
    gpContact: {
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      address: { type: String, required: true },
    },
    visits: [
      {
        visitID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Visit",
        },
      },
    ],
    visitDays: [
      {
        type: String,
        required: true,
      },
    ],
    scheduledVisits: {
      morning: {
        tasks: [
          {
            type: String,
            required: true,
          },
        ],
        medications: [
          {
            name: { type: String, required: true },
            dosage: { type: String, required: true },
          },
        ],
        prns: [
          {
            name: { type: String, required: true },
            dosage: { type: String, required: true },
          },
        ],
      },
      lunch: {
        tasks: [
          {
            type: String,
            required: true,
          },
        ],
        medications: [
          {
            name: { type: String, required: true },
            dosage: { type: String, required: true },
          },
        ],
        prns: [
          {
            name: { type: String, required: true },
            dosage: { type: String, required: true },
          },
        ],
      },
      tea: {
        tasks: [
          {
            type: String,
            required: true,
          },
        ],
        medications: [
          {
            name: { type: String, required: true },
            dosage: { type: String, required: true },
          },
        ],
        prns: [
          {
            name: { type: String, required: true },
            dosage: { type: String, required: true },
          },
        ],
      },
      bed: {
        tasks: [
          {
            type: String,
            required: true,
          },
        ],
        medications: [
          {
            name: { type: String, required: true },
            dosage: { type: String, required: true },
          },
        ],
        prns: [
          {
            name: { type: String, required: true },
            dosage: { type: String, required: true },
          },
        ],
      },
    },
  },
  {
    timestamps: true,
  }
);

const ServiceUser = mongoose.model("ServiceUser", serviceUserSchema);

module.exports = ServiceUser;
