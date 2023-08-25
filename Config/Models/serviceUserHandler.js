import mongoose from "mongoose";

const serviceUserHandlerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ServiceUserHandler = mongoose.model(
  "ServiceUserHandler",
  serviceUserHandlerSchema
);

export default ServiceUserHandler;
