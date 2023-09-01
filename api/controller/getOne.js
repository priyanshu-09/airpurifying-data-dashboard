const AirPurifierData = require("../model/model");

async function getOneDeviceData(req, res) {
  const deviceId = req.params.deviceId;
  console.log(deviceId);
  try {
    const deviceData = await AirPurifierData.findOne({ deviceId });
    if (!deviceData) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.json(deviceData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getOneDeviceData };
