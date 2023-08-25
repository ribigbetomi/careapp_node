import mongoose from "mongoose";

const serviceUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  visits: [
    {
      ref: "Visit",
    },
  ],
  tasksAndMedications: [
    {
      type: String,
      required: true,
    },
  ],
});

const ServiceUser = mongoose.model("ServiceUser", serviceUserSchema);

export default ServiceUser;
