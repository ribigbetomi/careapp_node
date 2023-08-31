const express = require("express");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../Middleware/AuthMiddleware");
const Visit = require("../Models/visitModel");

const visitRouter = express.Router();

visitRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    //   const { phoneNumber, password } = req.body;
    const visit = await Visit.findById(req.params.id);

    if (visit) {
      res.json(visit);
    } else {
      res.status(401);
      throw new Error("User not Found");
    }
  })
);

visitRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const careLog = {
      note: {},
      coronaSymptoms: {},
      drink: {},
      food: {},
      toiletVisit: {},
      mood: {},
      mentalHealth: "",
      physicalHealth: "",
      weight: "",
    };
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
      careLog,
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

// Careworker check in to visit
visitRouter.put(
  "/:id/visit",
  protect,
  asyncHandler(async (req, res) => {
    const { checkInTime } = req.body;

    const visit = await Visit.findById(req.params.id);

    const careWorker = visit.careWorkers.find(
      (cW) => cW.userID === req.user._id
    );

    if (careWorker) {
      if (checkInTime) {
        careWorker.checkInTime = checkInTime;
        let updatedCareWorkers = visit.careWorkers.map((cw) =>
          cw.userID === careWorker.userID ? careWorker : cw
        );
        visit = { ...visit, careWorkers: updatedCareWorkers };
      }

      const updatedVisit = await visit.save();
      res.json(updatedVisit);
    } else {
      res.status(401);
      throw new Error("Something went wrong");
    }
  })
);

// CareWorker update careLog
visitRouter.put(
  "/:id/carelog",
  protect,
  asyncHandler(async (req, res) => {
    const {
      note,
      coronaSymptoms,
      drink,
      food,
      toiletVisit,
      mood,
      mentalHealth,
      physicalHealth,
      weight,
    } = req.body;

    const visit = await Visit.findById(req.params.id);

    if (visit) {
      visit.careLog.note = note ? note : visit.careLog.note;
      visit.careLog.coronaSymptoms = coronaSymptoms
        ? coronaSymptoms
        : visit.careLog.coronaSymptoms;
      visit.careLog.drink = drink ? drink : visit.careLog.drink;
      visit.careLog.food = food ? food : visit.careLog.food;
      visit.careLog.toiletVisit = toiletVisit
        ? toiletVisit
        : visit.careLog.toiletVisit;
      visit.careLog.mood = mood ? mood : visit.careLog.mood;
      visit.careLog.mentalHealth = mentalHealth
        ? mentalHealth
        : visit.careLog.mentalHealth;
      visit.careLog.physicalHealth = physicalHealth
        ? physicalHealth
        : visit.careLog.physicalHealth;
      visit.careLog.weight = weight ? weight : visit.careLog.weight;

      const updatedVisit = await visit.save();
      res.json(updatedVisit);
    } else {
      res.status(401);
      throw new Error("Something went wrong");
    }
  })
);

// CareWorker update tasks and medications
visitRouter.put(
  "/:id/tasksandmedications",
  protect,
  asyncHandler(async (req, res) => {
    const { tasks, medications, PRNs } = req.body;

    const visit = await Visit.findById(req.params.id);

    if (visit) {
      visit.tasks = tasks ? tasks : visit.tasks;
      visit.medications = medications ? medications : visit.medications;
      visit.PRNs = PRNs ? PRNs : visit.PRNs;

      const updatedVisit = await visit.save();
      res.json(updatedVisit);
    } else {
      res.status(401);
      throw new Error("Something went wrong");
    }
  })
);

module.exports = visitRouter;
