const express = require("express");
const asyncHandler = require("express-async-handler");
const { admin } = require("../Middleware/AuthMiddleware");
const ServiceUser = require("../Models/serviceUserModel");

const serviceUserRouter = express.Router();

// Register
serviceUserRouter.post(
  "/",
  admin,
  asyncHandler(async (req, res) => {
    const { name, address, entryNote, visitDays, scheduledVisits } = req.body;

    const serviceUserExists = await ServiceUser.findOne({ name, address });

    if (serviceUserExists) {
      res.status(400);
      throw new Error("User with the same name and address already exists");
    }

    const serviceUser = await ServiceUser.create({
      name,
      address,
      entryNote,
      visitDays,
      scheduledVisits,
    });

    if (serviceUser) {
      res.status(201).json({
        _id: serviceUser._id,
        name: serviceUser.name,
        address: serviceUser.address,
        entryNote: serviceUser.entryNote,
        visitDays: serviceUser.visitDays,
        scheduledVisits: serviceUser.scheduledVisits,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

module.exports = serviceUserRouter;
