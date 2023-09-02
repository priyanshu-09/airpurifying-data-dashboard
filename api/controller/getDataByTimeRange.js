const AirPurifierData = require("../model/model");

async function getDataByTimeRange(req, res) {
  const { startDate, endDate } = req.query;

  try {
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    const devicesData = await AirPurifierData.find({});

    const filteredValues = devicesData.map((device) => {
      const deviceInfo = {
        deviceId: device.deviceId,
      };

      console.log(device.deviceId);

      // Filter Function to find if the given time range encompasses any values in the database
      const timeFilter = device.data.filter(
        (datapoint) =>
          datapoint["timestamp"].getTime() > startTimestamp &&
          datapoint["timestamp"].getTime() < endTimestamp
      );
      console.log(timeFilter);

      // If there are no datapoints for a particular range in the DB, the timeFilter key would be null
      return { ...deviceInfo, data: timeFilter.length > 0 ? timeFilter : null };
    });

    // If for all the devices the timeFilter key is null, a response is sent to frontedn
    if (areAllValuesNull(filteredValues)) {
      return res.json({ message: "No data found" });
    }
    res.json(filteredValues);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// This function checks if for all the devices the data key is null
function areAllValuesNull(arr) {
  return arr.every((obj) => {
    console.log(obj);
    if (obj.data !== null) return false;
    console.log("returing");
    return true;
  });
}

module.exports = { getDataByTimeRange };
