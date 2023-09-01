const express = require("express");

const router = express.Router();
const AirPurifierData = require("../model/model");

const multer = require("multer");
const bulkUpdateController = require("../controller/bulkUpdate");
const { Signup } = require("../controller/auth");
const { Login } = require("../controller/auth");
const getOneController = require("../controller/getOne");
const getPMController = require("../controller/getPMValues");
const getDataByTimeRangeController = require("../controller/getDataByTimeRange");
const { userVerification } = require("../middleware/authMiddleware");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/signup", Signup);
router.post("/login", Login);

router.post(
  "/bulkUpdate",
  userVerification,
  upload.single("csvFile"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const csvData = req.file.buffer.toString();
    bulkUpdateController.bulkUpdate(csvData, req, res);
  }
);

router.get("/getAll", userVerification, async (req, res) => {
  try {
    const data = await AirPurifierData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get(
  "/getOne/:deviceId",
  userVerification,
  getOneController.getOneDeviceData
);

router.get(
  "/getPmValue/:pmValue",
  userVerification,
  getPMController.getPMValues
);

router.get(
  "/getTimeRangeData",
  userVerification,
  getDataByTimeRangeController.getDataByTimeRange
);

module.exports = router;
