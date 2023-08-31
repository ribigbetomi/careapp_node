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
    companyName: { type: String, required: true },
    gpContact: {
      type: "String",
      required: true,
    },
    visits: [
      {
        ref: "Visit",
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
            type: String,
            required: true,
          },
        ],
        PRNs: [
          {
            type: String,
            required: true,
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
            type: String,
            required: true,
          },
        ],
        PRNs: [
          {
            type: String,
            required: true,
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
            type: String,
            required: true,
          },
        ],
        PRNs: [
          {
            type: String,
            required: true,
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
            type: String,
            required: true,
          },
        ],
        PRNs: [
          {
            type: String,
            required: true,
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
