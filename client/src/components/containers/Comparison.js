import React, { useEffect, useState } from "react";
import styles from "../../styles/Comparison.module.css";
import { TabSwitcher } from "./TabSwitcher";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../../utils/networkConstants";

export const Comparison = ({ deviceIdArr }) => {
  const pmValues = ["pm1", "pm25", "pm10"];
  const [selectedPmValue, setSelectedPmValue] = useState(0);
  const [dataToBeShown, setDataToBeShown] = useState(0);
  const [strokeColors, setStrokeColors] = useState(0);

  useEffect(() => {
    console.log("This");
    const handlePMData = async () => {
      const { data } = await axios.get(
        BASE_URL + ENDPOINTS.GET_PM_VALUE + `/${pmValues[selectedPmValue]}`,

        { withCredentials: true }
      );
      mergeDataForDifferentDevices(data);
    };
    handlePMData();
  }, [selectedPmValue]);

  useEffect(() => {
    if (deviceIdArr) {
      let tempStrokeColor = generateRandomColors(deviceIdArr.length);
      setStrokeColors(tempStrokeColor);
    }
  }, [deviceIdArr]);

  const mergeDataForDifferentDevices = (data) => {
    const timestampMap = new Map();
    function addObjectToMap(obj) {
      if (timestampMap.has(obj.timestamp)) {
        timestampMap.get(obj.timestamp).push(obj);
      } else {
        timestampMap.set(obj.timestamp, [obj]);
      }
    }

    for (let devices in data) {
      for (let obj in data[devices].data) {
        addObjectToMap(data[devices].data[obj]);
      }
    }

    const mergedArray = [];

    for (const arrOfObj of timestampMap.values()) {
      if (arrOfObj.length > 1) {
        let temp = {};
        for (const obj in arrOfObj) temp = { ...temp, ...arrOfObj[obj] };
        mergedArray.push(temp);
      }
    }

    setDataToBeShown(mergedArray);
  };
  const generateRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const generateRandomColors = (N) => {
    const randomColors = [];
    for (let i = 0; i < N; i++) {
      randomColors.push(generateRandomColor());
    }
    return randomColors;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <TabSwitcher
          tabs={pmValues}
          currentTab={selectedPmValue}
          setCurrentTab={setSelectedPmValue}
        />
      </div>
      {dataToBeShown.length > 0 && (
        <ResponsiveContainer
          width={window.outerWidth * 0.7}
          height={window.outerHeight * 0.6}
        >
          <AreaChart
            width={window.outerWidth * 0.7}
            height={window.outerHeight * 0.7}
            data={dataToBeShown}
            margin={{
              top: 50,
              right: 0,
              left: 0,
              bottom: 50,
            }}
          >
            {/* <CartesianGrid strokeDasharray="10 10" /> */}
            <XAxis
              tickMargin={40}
              angle={-30}
              dataKey="timestamp"
              tickFormatter={(value) => {
                return value.split("T")[0];
              }}
            />
            <YAxis />
            <Tooltip />
            {deviceIdArr.map((item, index) => {
              return (
                <Area
                  dataKey={item}
                  stackId={(index + 1).toString}
                  stroke={strokeColors[index]}
                  fill="none"
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
