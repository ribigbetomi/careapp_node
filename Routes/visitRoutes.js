const express = require("express");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../Middleware/AuthMiddleware");
const Visit = require("../Models/visitModel");

const visitRouter = express.Router();

visitRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { time, date, type, serviceUserID, careWorkers } = req.body;

    // if (userType === "careWorker") {
    const visitExists = await Visit.findOne({ date, type, serviceUserID });

    if (visitExists) {
      res.status(400);
      throw new Error("Visit already exists");
    }

    const visit = await Visit.create({
      time,
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
        //   token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);
