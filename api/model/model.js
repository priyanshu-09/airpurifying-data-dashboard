const mongoose = require("mongoose");

const airPurifierDeviceSchema = new mongoose.Schema({
  windDirection: {
    type: String,
    required: true,
  },
  windSpeed: {
    type: Number,
    required: true,
  },
  pm1: {
    type: Number,
    required: true,
  },
  pm25: {
    type: Number,
    required: true,
  },
  pm10: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const airPurifierDataSchema = new mongoose.Schema({
  deviceId: String,

  data: [airPurifierDeviceSchema], // Array of data points
});

const AirPurifierData = mongoose.model(
  "AirPurifierData",
  airPurifierDataSchema
);

module.exports = AirPurifierData;
