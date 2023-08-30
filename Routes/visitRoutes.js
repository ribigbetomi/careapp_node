const express = require("express");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../Middleware/AuthMiddleware");
const Visit = require("../Models/visitModel");

const visitRouter = express.Router();

visitRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { startTime, endTime, date, type, serviceUserID, careWorkers } =
      req.body;

    const visitExists = await Visit.findOne({ date, type, serviceUserID });

    if (visitExists) {
      res.status(400);
      throw new Error("Visit already exists");
    }

    const visit = await Visit.create({
      startTime,
      endTime,
      date,
      type,
      serviceUserID,
      careWorkers,
    });

    if (visit) {
      res.status(201).json({
        _id: visit._id,
        time: visit.time,
        date: visit.date,
        type: visit.type,
        serviceUserID: visit.serviceUserID,
        careWorkers: visit.careWorkers,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

careWorkerRouter.put(
  "/:userID",
  protect,
  asyncHandler(async (req, res) => {
    const { name, phoneNumber, email, availability } = req.body;
    const careWorker = await CareWorker.findOne({ userID: req.params.userID });

    if (careWorker) {
      careWorker.name = name || careWorker.name;
      careWorker.phoneNumber = phoneNumber || careWorker.phoneNumber;
      careWorker.email = email || careWorker.email;
      careWorker.availability = availability || careWorker.availability;

      if (req.body.password) {
        careWorker.password = req.body.password;
      }
      const updatedCareWorker = await careWorker.save();

      res.json({
        _id: updatedCareWorker._id,
        name: updatedCareWorker.name,
        phoneNumber: updatedCareWorker.phoneNumber,
        email: updatedCareWorker.email,
        availabilty: updatedCareWorker.availabilty,
      });
    } else {
      res.status(401);
      throw new Error("User not Found");
    }
  })
);

module.exports = visitRouter;
