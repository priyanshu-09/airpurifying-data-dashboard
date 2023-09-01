const csv = require("csv-parser");
const fs = require("fs");
const AirPurifierData = require("../model/model");

function bulkUpdate(csvData, req, res) {
  const results = [];
  let deviceId = "";

  const readableStream = require("stream").Readable.from(csvData);

  let rowNumber = 0;

  readableStream
    .pipe(csv({ headers: true }))
    .on("data", (row) => {
      try {
        deviceId = row?.["_0"];
        const timestamp = validDate(row?.["_1"]);
        const newDataPoint = {
          timestamp: timestamp,
          windSpeed: parseInt(row?.["_2"]),
          windDirection: row?.["_3"],
          pm1: parseInt(row?.["_4"]),
          pm25: parseInt(row?.["_5"]),
          pm10: parseInt(row?.["_6"]),
        };
        results.push(newDataPoint);
        rowNumber += 1;
      } catch (error) {
        console.log(error);
      }
    })
    .on("end", () => {
      console.log("CSV data processed:");
      console.log(rowNumber);
      AirPurifierData.findOne({ deviceId: deviceId })
        .then((existingDocument) => {
          if (existingDocument) {
            res.status(409).json({
              message: "A document with the same deviceId already exists!",
            });
          } else {
            const newData = AirPurifierData({
              deviceId: deviceId,
              data: results,
            });

            return newData.save();
          }
        })
        .then((savedData) => {
          if (savedData) {
            res.status(200).json({
              message: "Data Saved",
            });
          }
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    });
}

function validDate(dateString) {
  const [datePart, timePart] = dateString.split(",");
  const [year, month, day] = datePart.split("/");
  const [hour, minute, second] = timePart.split(":");

  const validDate = new Date(`20${year}`, month - 1, day, hour, minute, second);
  return validDate;
}

module.exports = {
  bulkUpdate,
};
