const express = require("express");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../Middleware/AuthMiddleware");
const generateToken = require("../utils/generateToken");
const ServiceUserHandler = require("../Models/serviceUserHandler");

const serviceUserHandlerRouter = express.Router();

// Login
serviceUserHandlerRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { phoneNumber, password } = req.body;
    const serviceUserHandler = await ServiceUserHandler.findOne({
      phoneNumber,
    });

    if (
      serviceUserHandler &&
      (await serviceUserHandler.matchPassword(password))
    ) {
      res.json({
        userID: serviceUserHandler.userID,
        name: serviceUserHandler.name,
        phoneNumber: serviceUserHandler.phoneNumber,
        email: serviceUserHandler.email,
        isAdmin: serviceUserHandler.isAdmin,
        token: generateToken(serviceUserHandler._id),
        createdAt: serviceUserHandler.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

// Register
serviceUserHandlerRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber, userType, userID } = req.body;

    const serviceUserHandlerExists = await ServiceUserHandler.findOne({
      phoneNumber,
    });

    if (serviceUserHandlerExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const serviceUserHandler = await ServiceUserHandler.create({
      name,
      email,
      password,
      phoneNumber,
      userType,
      userID,
    });

    if (serviceUserHandler) {
      res.status(201).json({
        _id: serviceUserHandler._id,
        name: serviceUserHandler.name,
        email: serviceUserHandler.email,
        isAdmin: serviceUserHandler.isAdmin,
        token: generateToken(serviceUserHandler._id),
      });
    }
  })
);

module.exports = serviceUserHandlerRouter;
