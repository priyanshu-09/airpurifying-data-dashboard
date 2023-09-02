const AirPurifierData = require("../model/model");

async function getPMValues(req, res) {
  let pmValueToFind = req.params.pmValue;
  try {
    const devicesData = await AirPurifierData.find({});
    if (!devicesData) {
      return res.status(404).json({ message: "No data found" });
    }
    console.log(pmValueToFind);
    const pmValues = devicesData.map((device) => {
      const deviceInfo = {
        deviceId: device.deviceId,
      };

      // This array of object returns the deviceId as key and the desired pm value as the value which is useful to show the comparison chart
      const pmData = device.data.map((datapoint) => ({
        [device.deviceId]: datapoint[pmValueToFind],
        timestamp: datapoint["timestamp"],
      }));
      return { ...deviceInfo, data: pmData };
    });

    res.json(pmValues);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getPMValues };
