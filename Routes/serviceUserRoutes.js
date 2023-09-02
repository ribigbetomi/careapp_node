const express = require("express");
const asyncHandler = require("express-async-handler");
const { admin, protect } = require("../Middleware/AuthMiddleware");
const ServiceUser = require("../Models/serviceUserModel");

const serviceUserRouter = express.Router();

// GET ALL serviceUsers
serviceUserRouter.get(
  "/",
  // protect,
  asyncHandler(async (req, res) => {
    //   const { phoneNumber, password } = req.body;
    const serviceUsers = await ServiceUser.find({ withCompany: true });

    if (serviceUsers) {
      res.json(serviceUsers);
    } else {
      res.status(401);
      throw new Error("User not Found");
    }
  })
);

// GET serviceUser
serviceUserRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    //   const { phoneNumber, password } = req.body;
    const serviceUser = await ServiceUser.findById(req.params.id);

    if (serviceUser) {
      res.json(serviceUser);
    } else {
      res.status(401);
      throw new Error("User not Found");
    }
  })
);

// Register
serviceUserRouter.post(
  "/",
  admin,
  asyncHandler(async (req, res) => {
    const {
      name,
      address,
      entryNote,
      visitDays,
      scheduledVisits,
      gpContact,
      company,
    } = req.body;

    const serviceUserExists = await ServiceUser.findOne({ name, address });

    if (serviceUserExists && serviceUserExists.company.name === company.name) {
      res.status(400);
      throw new Error("User with the same name and address already exists");
    }

    const serviceUser = await ServiceUser.create({
      name,
      address,
      entryNote,
      visitDays,
      scheduledVisits,
      gpContact,
      company,
      withCompany: true,
    });

    if (serviceUser) {
      res.status(201).json({
        _id: serviceUser._id,
        name: serviceUser.name,
        address: serviceUser.address,
        entryNote: serviceUser.entryNote,
        visitDays: serviceUser.visitDays,
        scheduledVisits: serviceUser.scheduledVisits,
        gpContact: serviceUser.gpContact,
        company: serviceUser.company,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// Careworker upload visits in serviceUser
serviceUserRouter.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const { visit } = req.body;
    const serviceUser = await ServiceUser.findById(req.params.id);

    if (serviceUser) {
      serviceUser.visits.push(visit);
      // serviceUser.phoneNumber = phoneNumber || serviceUser.phoneNumber;
      // serviceUser.email = email || serviceUser.email;
      // serviceUser.availability = availability || serviceUser.availability;

      const updatedServiceUser = await serviceUser.save();

      res.json(updatedServiceUser);
    } else {
      res.status(401);
      throw new Error("User not Found");
    }
  })
);

// Admin update data of serviceUser
serviceUserRouter.put(
  "/:id/profile",
  admin,
  asyncHandler(async (req, res) => {
    const {
      name,
      address,
      entryNote,
      gpContact,
      visitDays,
      scheduledVisits,
      company,
      withCompany,
    } = req.body;
    const serviceUser = await ServiceUser.findById(req.params.id);

    if (serviceUser) {
      serviceUser.name = name ? name : serviceUser.name;
      serviceUser.address = address ? address : serviceUser.address;
      serviceUser.entryNote = entryNote ? entryNote : serviceUser.entryNote;
      serviceUser.gpContact = gpContact ? gpContact : serviceUser.gpContact;
      serviceUser.visitDays = visitDays ? visitDays : serviceUser.visitDays;
      serviceUser.scheduledVisits = scheduledVisits
        ? scheduledVisits
        : serviceUser.scheduledVisits;
      serviceUser.company = company ? company : serviceUser.company;
      serviceUser.withCompany = withCompany
        ? withCompany
        : serviceUser.withCompany;

      const updatedServiceUser = await serviceUser.save();

      res.json(updatedServiceUser);
    } else {
      res.status(401);
      throw new Error("User not Found");
    }
  })
);

module.exports = serviceUserRouter;
